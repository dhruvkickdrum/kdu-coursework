package com.dhruv.smarthomedevicemanagement.repository;

import com.dhruv.smarthomedevicemanagement.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    Optional<Device> findByIdAndDeletedAtIsNull(Long id);

    @Query("SELECT d from Device d WHERE d.house.id = :houseId AND d.deletedAt IS NULL")
    List<Device> findByHouseId(@Param("houseId") Long houseId);

    @Query("SELECT d from Device d WHERE d.room.id = :roomId AND d.deletedAt IS NULL")
    List<Device> findByRoomId(@Param("roomId") Long roomId);

    boolean existsByDeviceInventoryIdAndDeletedAtIsNull(Long deviceInventoryId);
}
