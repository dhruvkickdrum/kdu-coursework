package com.dhruv.hospital.staffing.services;

import com.dhruv.hospital.staffing.entity.Shift;
import com.dhruv.hospital.staffing.repository.ShiftRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class ShiftService {
    private final ShiftRepository repo;


    public ShiftService(ShiftRepository repo) {
        this.repo = repo;
    }

    public Shift save(Shift shift) {
        return repo.save(shift);
    }

    public List<Shift> getTop3NewYearShifts() {
        return repo.findTopNewYearShifts(
                LocalDate.of(2023, 1, 1),
                LocalDate.of(2023, 1, 25),
                PageRequest.of(0,3)
        );
    }
}
