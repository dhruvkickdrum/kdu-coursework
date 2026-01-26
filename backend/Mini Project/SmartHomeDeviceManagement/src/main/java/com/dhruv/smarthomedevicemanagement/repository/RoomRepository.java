package com.dhruv.smarthomedevicemanagement.repository;

import com.dhruv.smarthomedevicemanagement.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByIdAndDeletedAtIsNull(Long id);

    @Query("SELECT r FROM Room r WHERE r.house.id =:houseId AND r.deletedAt IS NULL")
    List<Room> findByHouseId(@Param("houseId") Long houseId);

    @Query("SELECT r FROM Room r " +
    "LEFT JOIN FETCH r.devices d " +
    "WHERE r.house.id = :houseId " +
    "AND r.deletedAt IS NULL " +
    "AND (d.deletedAt IS NULL OR d IS NULL)")
    List<Room> findByHouseIdWithDevices(@Param("houseId") Long houseId);
}
