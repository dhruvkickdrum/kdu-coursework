package com.dhruv.smarthomedevicemanagement.services;

import com.dhruv.smarthomedevicemanagement.dto.AddDeviceRequestDto;
import com.dhruv.smarthomedevicemanagement.dto.DeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.MoveDeviceRequestDto;
import com.dhruv.smarthomedevicemanagement.entity.*;
import com.dhruv.smarthomedevicemanagement.exception.BadRequestException;
import com.dhruv.smarthomedevicemanagement.exception.DeviceAllreadyRegisteredException;
import com.dhruv.smarthomedevicemanagement.exception.ResourceNotFoundException;
import com.dhruv.smarthomedevicemanagement.repository.DeviceRepository;
import com.dhruv.smarthomedevicemanagement.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final DeviceInventoryService deviceInventoryService;
    private final HouseService houseService;
    private final RoomRepository roomRepository;

    @Transactional
    public DeviceResponseDto addDevice(Long houseId, AddDeviceRequestDto requestDto) {
        House house = houseService.getHouseAndVerifyAdmin(houseId);

        // Validate device credentials from device inventory
        DeviceInventory deviceInventory = deviceInventoryService.validateAndGetDevice(requestDto.getKickstonId(), requestDto.getDeviceUsername(), requestDto.getDevicePassword());

        // Check if device is allready registred or not
        if(deviceRepository.existsByDeviceInventoryIdAndDeletedAtIsNull(deviceInventory.getId())) {
            throw new DeviceAllreadyRegisteredException("Device is allready registered");
        }

        Room room = null;
        if(requestDto.getRoomId() != null) {
            room = roomRepository
                    .findByIdAndDeletedAtIsNull(requestDto.getRoomId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Room", "id", requestDto.getRoomId()));

            if (!room.getHouse().getId().equals(houseId)) {
                throw new BadRequestException("Room does not belong to this house");
            }
        }

        log.info("Adding device {} to house {}", deviceInventory.getKickstonId(), houseId);

        Device device = Device.builder()
                .name(requestDto.getDeviceName())
                .deviceInventory(deviceInventory)
                .house(house)
                .room(room)
                .status(DeviceStatus.ACTIVE)
                .build();

        device = deviceRepository.save(device);

        // Mark device as registered in the invenotory
        deviceInventory.setIsRegistered(true);

        log.info("Device added successfully: {}", device.getId());
        return mapToDeviceResponse(device);

    }

    @Transactional
    public DeviceResponseDto moveDevice(Long houseId, Long deviceId, MoveDeviceRequestDto requestDto) {
        houseService.getHouseAndVerifyAccess(houseId);

        Device device = deviceRepository.findByIdAndDeletedAtIsNull(deviceId).orElseThrow(() -> new ResourceNotFoundException("Device", "id", deviceId));

        if(!device.getHouse().getId().equals(houseId)) {
            throw new BadRequestException("Device does not belong to this house");
        }

        Room targetRoom = roomRepository
                .findByIdAndDeletedAtIsNull(requestDto.getTargetRoomId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Room", "id", requestDto.getTargetRoomId()));

        if(!targetRoom.getHouse().getId().equals(houseId)) {
            throw new BadRequestException("Target room does not belong to this house");
        }

        log.info("Moving device {} from room {} to room {}", deviceId, device.getRoom() != null ? device.getRoom().getId() : "none", targetRoom.getId());

        device.setRoom(targetRoom);
        device = deviceRepository.save(device);

        return mapToDeviceResponse(device);
    }

    @Transactional(readOnly = true)
    public List<DeviceResponseDto> getDevicesByHouseId(Long houseId) {
        houseService.getHouseAndVerifyAccess(houseId);
        log.info("Fetching devices for house: {}", houseId);

        List<Device> devices = deviceRepository.findByHouseId(houseId);

        return devices.stream()
                .map(this::mapToDeviceResponse)
                .collect(Collectors.toList());
    }

    public DeviceResponseDto mapToDeviceResponse(Device device) {
        return DeviceResponseDto.builder()
                .id(device.getId())
                .name(device.getName())
                .kickstonId(device.getDeviceInventory().getKickstonId())
                .houseId(device.getHouse().getId())
                .roomId(device.getRoom() != null ? device.getRoom().getId() : null)
                .roomName(device.getRoom() != null ? device.getRoom().getName() : null)
                .status(device.getStatus())
                .manufactureFactoryPlace(device.getDeviceInventory().getManufactureFactoryPlace())
                .manufactureDateTime(device.getDeviceInventory().getManufactureDateTime())
                .createdAt(device.getCreatedAt())
                .modifiedAt(device.getModifiedAt())
                .build();
    }
}
