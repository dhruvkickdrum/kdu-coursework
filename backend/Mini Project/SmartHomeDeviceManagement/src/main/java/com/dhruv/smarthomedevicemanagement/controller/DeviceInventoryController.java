package com.dhruv.smarthomedevicemanagement.controller;

import com.dhruv.smarthomedevicemanagement.dto.ApiResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.DeviceInventoryResponseDto;
import com.dhruv.smarthomedevicemanagement.services.DeviceInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/deviceInventory")
@RequiredArgsConstructor
public class DeviceInventoryController {
    private final DeviceInventoryService deviceInventoryService;

    // Return the list of all devices present in the inventory
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<DeviceInventoryResponseDto>>> getAllDeviceInventory() {
        List<DeviceInventoryResponseDto> responseDtos =  deviceInventoryService.getAllDevices();
        return ResponseEntity.ok(ApiResponseDto.success(responseDtos));
    }
}

