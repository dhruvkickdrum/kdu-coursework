package com.dhruv.smarthomedevicemanagement.repository;

import com.dhruv.smarthomedevicemanagement.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    Optional<House> findByIdAndDeletedAtIsNull(Long id);

    @Query("SELECT h FROM House h WHERE h.admin.id = :userId AND h.deletedAt IS NULL")
    List<House> findByAdminId(@Param("userId") Long userId);

    @Query("SELECT DISTINCT h FROM House h " +
    "LEFT JOIN h.houseUsers hu " +
    "WHERE (h.admin.id = :userId OR hu.user.id = :userId) " +
    "AND h.deletedAt IS NULL")
    List<House> findAllByUserId(@Param("userId") Long userId);
}
