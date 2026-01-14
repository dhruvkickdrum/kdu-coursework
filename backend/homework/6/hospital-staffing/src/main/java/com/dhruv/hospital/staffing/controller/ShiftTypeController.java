package com.dhruv.hospital.staffing.controller;

import com.dhruv.hospital.staffing.entity.ShiftType;
import com.dhruv.hospital.staffing.repository.ShiftTypeRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shift-types")
public class ShiftTypeController {
    private final ShiftTypeRepository repo;

    public ShiftTypeController(ShiftTypeRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ShiftType save(@RequestBody ShiftType shiftType){
        return repo.save(shiftType);
    }
}
