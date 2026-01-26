package com.dhruv.smarthomedevicemanagement.services;

import com.dhruv.smarthomedevicemanagement.dto.DeviceInventoryResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.DeviceResponseDto;
import com.dhruv.smarthomedevicemanagement.entity.DeviceInventory;
import com.dhruv.smarthomedevicemanagement.exception.InvalidCredentialsException;
import com.dhruv.smarthomedevicemanagement.repository.DeviceInventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceInventoryService {
    private final DeviceInventoryRepository deviceInventoryRepository;

    @Transactional(readOnly = true)
    public DeviceInventory validateAndGetDevice(String kickstonId, String username, String passsword) {
        log.info("Validating device credentials for kickstonId : {}" , kickstonId);

        DeviceInventory device = deviceInventoryRepository
                .findByKickstonIdAndDeviceUsernameAndDevicePassword(kickstonId, username, passsword)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid device credentials device not found in inventory or credentials do not watch."));

        log.info("Device credentials validated successfully");
        return device;
    }

    @Transactional(readOnly = true)
    public List<DeviceInventoryResponseDto> getAllDevices() {
        List<DeviceInventory> devices = deviceInventoryRepository.findAll();

        List<DeviceInventoryResponseDto> responseDtos = devices.stream()
                .map(deviceInventory -> DeviceInventoryResponseDto.builder()
                        .kickstonId(deviceInventory.getKickstonId())
                        .deviceUsername(deviceInventory.getDeviceUsername())
                        .devicePassword(deviceInventory.getDevicePassword())
                        .manufactureFactoryPlace(deviceInventory.getManufactureFactoryPlace())
                        .manufactureDateTime(deviceInventory.getManufactureDateTime())
                        .isRegistered(deviceInventory.getIsRegistered())
                        .build()
                )
                .toList();
        return responseDtos;
    }
}
