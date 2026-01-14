package com.dhruv.hospital.staffing.repository;

import com.dhruv.hospital.staffing.entity.Shift;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    @Query("""
        SELECT s FROM Shift s 
        WHERE s.startDate = :start
        AND s.endDate <= :end
        ORDER BY s.shiftName ASC
    """)
    List<Shift> findTopNewYearShifts(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            Pageable pageable
    );


}
