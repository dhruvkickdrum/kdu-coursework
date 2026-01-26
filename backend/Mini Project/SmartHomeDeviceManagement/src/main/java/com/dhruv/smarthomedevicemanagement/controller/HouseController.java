package com.dhruv.smarthomedevicemanagement.controller;

import com.dhruv.smarthomedevicemanagement.dto.*;
import com.dhruv.smarthomedevicemanagement.services.HouseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/houses")
@RequiredArgsConstructor
public class HouseController {
    private final HouseService houseService;

    // Creating the new house and make the login user as admin
    @PostMapping
    public ResponseEntity<ApiResponseDto<HouseResponseDto>> createHouse(@Valid @RequestBody CreateHouseRequestDto requestDto) {
        HouseResponseDto responseDto = houseService.createHouse(requestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("House Created successfully", responseDto));
    }

    // return the house detail of the houseId
    @GetMapping("/{houseId}")
    public ResponseEntity<ApiResponseDto<HouseResponseDto>> getHouseById(@PathVariable Long houseId) {
        HouseResponseDto responseDto = houseService.getHouseById(houseId);
        return ResponseEntity.ok(ApiResponseDto.success(responseDto));
    }

    // Update the address of the house ( by admin only )
    @PutMapping("/{houseId}/address")
    public ResponseEntity<ApiResponseDto<HouseResponseDto>> updateAddress(@PathVariable Long houseId, @Valid @RequestBody UpdateAddressRequestDto requestDto) {
        HouseResponseDto responseDto = houseService.updateAddress(houseId, requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("Address updated successfully", responseDto));
    }

    // Add user to the house by admin only.
    @PostMapping("/{houseId}/users")
    public ResponseEntity<ApiResponseDto<String>> addUserToHouse(@PathVariable Long houseId, @Valid @RequestBody AddUserToHouseRequestDto requestDto) {
        houseService.addUserToHouse(houseId, requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("User addedd to house successfully", null));
    }

    // Return the list of all user that belong to this house (HouseId) any login user can fetch of any other houses.
    @GetMapping("/{houseId}/users")
    public ResponseEntity<ApiResponseDto<HouseUserResponseDto>> getAllUsersOfHouse(@PathVariable Long houseId) {
        HouseUserResponseDto responseDto = houseService.getAllUserOfHouse(houseId);
        return ResponseEntity.ok(ApiResponseDto.success(responseDto));
    }

    // Transfer the ownership of the house to some other user belong to his house.
    @PutMapping("/{houseId}/transfer-ownership")
    public ResponseEntity<ApiResponseDto<HouseResponseDto>> transferOwnership(@PathVariable Long houseId,@Valid @RequestBody TransferOwnershipRequestDto requestDto) {
        HouseResponseDto responseDto = houseService.transferOwnership(houseId, requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("Ownership transferred successfully.", responseDto));
    }

    // Return the list of all houses that the login user is the admin
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<HouseResponseDto>>> getAllUserHouses() {
        List<HouseResponseDto> responseDtos = houseService.getAllUserHouses();
        return ResponseEntity.ok(ApiResponseDto.success(responseDtos));
    }
}
