package com.dhruv.smarthomedevicemanagement.services;

import com.dhruv.smarthomedevicemanagement.dto.*;
import com.dhruv.smarthomedevicemanagement.entity.House;
import com.dhruv.smarthomedevicemanagement.entity.HouseUser;
import com.dhruv.smarthomedevicemanagement.entity.User;
import com.dhruv.smarthomedevicemanagement.exception.BadRequestException;
import com.dhruv.smarthomedevicemanagement.exception.ResourceNotFoundException;
import com.dhruv.smarthomedevicemanagement.exception.UnauthorizedException;
import com.dhruv.smarthomedevicemanagement.repository.HouseRepository;
import com.dhruv.smarthomedevicemanagement.repository.HouseUserRepository;
import com.dhruv.smarthomedevicemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HouseService {
    private final HouseRepository houseRepository;
    private final HouseUserRepository houseUserRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Transactional
    public HouseResponseDto createHouse(CreateHouseRequestDto requestDto) {
        User currentUser = userService.getCurrentUser();
        log.info("Creating house for user : {}", currentUser.getUsername());

        House house = House.builder()
                .name(requestDto.getName())
                .address(requestDto.getAddress())
                .admin(currentUser)
                .build();

        house = houseRepository.save(house);

        // Add admin as a house user
        HouseUser houseUser = HouseUser.builder()
                .house(house)
                .user(currentUser)
                .build();

        houseUserRepository.save(houseUser);

        log.info("House created Successfully : {}", house.getId());
        return mapToHouseResponse(house);
    }

    @Transactional(readOnly = true)
    public List<HouseResponseDto> getAllUserHouses() {
        User currentUser = userService.getCurrentUser();
        log.info("Fetching all houses for user : {}", currentUser.getUsername());

        List<House> houses = houseRepository.findAllByUserId(currentUser.getId());

        return houses.stream()
                .map(this::mapToHouseResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public HouseUserResponseDto getAllUserOfHouse(Long houseId) {
        House house = houseRepository.findById(houseId).orElseThrow(() -> new ResourceNotFoundException("House", "id", houseId));

        Long adminId = house.getAdmin().getId();

        List<HouseUser> houseUsers = houseUserRepository.findByHouseId(houseId);

        List<Long> userIds = houseUsers.stream()
                .map(houseUser -> houseUser.getUser().getId())
                .toList();

        List<User> users = userRepository.findByIdIn(userIds);

        List<UserWithRoleDto> userDtos = users.stream()
                .map(user -> UserWithRoleDto.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .role(
                                user.getId().equals(adminId)
                                ? "ADMIN"
                                        : "MEMBER"
                        )
                        .build())
                .toList();
        return HouseUserResponseDto.builder()
                .houseId(houseId)
                .users(userDtos)
                .build();
    }

    @Transactional(readOnly = true)
    public HouseResponseDto getHouseById(Long houseId) {
        House house = getHouseAndVerifyAccess(houseId);
        return mapToHouseResponse(house);
    }

    @Transactional
    public HouseResponseDto updateAddress(Long houseId, UpdateAddressRequestDto requestDto) {
        House house = getHouseAndVerifyAdmin(houseId);
        log.info("Updating address for house: {}", houseId);
        house.setAddress(requestDto.getAddress());
        house = houseRepository.save(house);
        return mapToHouseResponse(house);
    }

    @Transactional
    public void addUserToHouse(Long houseId, AddUserToHouseRequestDto requestDto) {
        House house = getHouseAndVerifyAdmin(houseId);
        User userToAdd = userService.getUserById(requestDto.getUserId());

        if(houseUserRepository.existsByHouseIdAndUserId(houseId, userToAdd.getId())) {
            throw new BadRequestException("User allready added to this house");
        }
        log.info("Adding user {} to house {}", userToAdd.getUsername(), houseId);

        HouseUser houseUser = HouseUser.builder()
                .house(house)
                .user(userToAdd)
                .build();

        houseUserRepository.save(houseUser);
    }

    @Transactional
    public HouseResponseDto transferOwnership(Long houseId, TransferOwnershipRequestDto requestDto) {
        House house = getHouseAndVerifyAdmin(houseId);

        // Verify new admin is part of the hosue or not
        boolean isUserInHouse = houseUserRepository.existsByHouseIdAndUserId(houseId, requestDto.getNewAdminUserId());

        if(!isUserInHouse){
            throw new BadRequestException("New admin must be a member of the house");
        }
        User newAdmin = userService.getUserById(requestDto.getNewAdminUserId());
        log.info("Transferring ownership of house {} to user {}", houseId, newAdmin.getUsername());

        house.setAdmin(newAdmin);
        house = houseRepository.save(house);
        return mapToHouseResponse(house);
    }

    @Transactional(readOnly = true)
    public House getHouseAndVerifyAccess(Long houseId) {
        User currentUser = userService.getCurrentUser();
        House house = houseRepository.findByIdAndDeletedAtIsNull(houseId).orElseThrow(() -> new ResourceNotFoundException("House", "id", houseId));

        boolean hasAccess = house.getAdmin().getId().equals(currentUser.getId()) || houseUserRepository.existsByHouseIdAndUserId(houseId, currentUser.getId());
        if(!hasAccess) {
            throw new UnauthorizedException("You don't have access to this house");
        }
        return house;
    }

    @Transactional(readOnly = true)
    public House getHouseAndVerifyAdmin(Long houseId) {
        User currentUser = userService.getCurrentUser();
        House house = houseRepository.findByIdAndDeletedAtIsNull(houseId).orElseThrow(() -> new ResourceNotFoundException("House", "id", houseId));

        if(!house.getAdmin().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Only house admin can perform this action");
        }
        return house;
    }

    private HouseResponseDto mapToHouseResponse(House house) {
        return HouseResponseDto.builder()
                .id(house.getId())
                .name(house.getName())
                .address(house.getAddress())
                .adminId(house.getAdmin().getId())
                .adminUsername(house.getAdmin().getUsername())
                .createdAt(house.getCreatedAt())
                .modifiedAt(house.getModifiedAt())
                .build();

    }
}
