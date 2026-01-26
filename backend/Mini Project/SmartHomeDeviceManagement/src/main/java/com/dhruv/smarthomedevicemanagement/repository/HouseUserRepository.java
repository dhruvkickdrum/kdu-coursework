package com.dhruv.smarthomedevicemanagement.repository;

import com.dhruv.smarthomedevicemanagement.entity.House;
import com.dhruv.smarthomedevicemanagement.entity.HouseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HouseUserRepository extends JpaRepository<HouseUser, Long> {
    @Query("SELECT hu from HouseUser hu WHERE hu.house.id = :houseId AND hu.user.id = :userId")
    Optional<HouseUser> findByHouseIdAndUserId(@Param("houseId") Long houseId, @Param("userId") Long userId);

    boolean existsByHouseIdAndUserId(Long houseId, Long userId);

    List<HouseUser> house(House house);

    List<HouseUser> findByHouseId(Long houseId);
}
