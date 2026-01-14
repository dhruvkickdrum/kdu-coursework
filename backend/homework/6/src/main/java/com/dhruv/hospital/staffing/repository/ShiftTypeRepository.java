package com.dhruv.hospital.staffing.repository;

import com.dhruv.hospital.staffing.entity.ShiftType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftTypeRepository  extends JpaRepository<ShiftType, Long> {
}
