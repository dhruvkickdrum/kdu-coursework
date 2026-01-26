package com.dhruv.smarthomedevicemanagement.repository;

import com.dhruv.smarthomedevicemanagement.dto.DeviceInventoryResponseDto;
import com.dhruv.smarthomedevicemanagement.entity.DeviceInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceInventoryRepository extends JpaRepository<DeviceInventory , Long> {
    Optional<DeviceInventory> findByKickstonId(String kickstonId);

    Optional<DeviceInventory> findByKickstonIdAndDeviceUsernameAndDevicePassword(String kickstonId, String deviceUsername, String devicePassword);
}
