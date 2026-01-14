package com.dhruv.hospital.staffing.controller;

import com.dhruv.hospital.staffing.entity.Shift;
import com.dhruv.hospital.staffing.repository.ShiftRepository;
import com.dhruv.hospital.staffing.services.ShiftService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shifts")
public class ShiftController {
    private final ShiftService service;
    private final ShiftRepository repo;


    public ShiftController(ShiftService service, ShiftRepository repo) {
        this.service = service;
        this.repo = repo;
    }

    @PostMapping
    public Shift save(@RequestBody Shift shift) {
        return service.save(shift);
    }

    @GetMapping("/new-year-top3")
    public List<Shift> getTop3() {
        return service.getTop3NewYearShifts();
    }
}
