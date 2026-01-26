package com.dhruv.smarthomedevicemanagement.controller;

import com.dhruv.smarthomedevicemanagement.dto.AddDeviceRequestDto;
import com.dhruv.smarthomedevicemanagement.dto.ApiResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.DeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.MoveDeviceRequestDto;
import com.dhruv.smarthomedevicemanagement.entity.Device;
import com.dhruv.smarthomedevicemanagement.services.DeviceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/houses/{houseId}/devices")
@RequiredArgsConstructor
public class DeviceController {
    private final DeviceService deviceService;

    // Add the device to the house ( done only by admin )
    @PostMapping
    public ResponseEntity<ApiResponseDto<DeviceResponseDto>> addDevice(@PathVariable Long houseId, @Valid @RequestBody AddDeviceRequestDto requestDto) {
        DeviceResponseDto responseDto = deviceService.addDevice(houseId, requestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("Device addedd successfully", responseDto));
    }

    // move the device to the new room ( Admin and member both can do this )
    @PutMapping("/{deviceId}/move")
    public ResponseEntity<ApiResponseDto<DeviceResponseDto>> moveDevice(@PathVariable Long houseId, @PathVariable Long deviceId, @Valid @RequestBody MoveDeviceRequestDto requestDto) {
        DeviceResponseDto responseDto = deviceService.moveDevice(houseId, deviceId, requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("Device moved successfully", responseDto));
    }

    // Return the devices belong to the houseID
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<DeviceResponseDto>>> getDevicesByHouseId(@PathVariable Long houseId) {
        List<DeviceResponseDto> devices = deviceService.getDevicesByHouseId(houseId);
        return ResponseEntity.ok(ApiResponseDto.success(devices));
    }
}
