package com.dhruv.hospital.staffing.repository;

import com.dhruv.hospital.staffing.entity.ShiftUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftUserRepository extends JpaRepository<ShiftUser, Long> {
}
