package com.dhruv.smartlock.controller;


import com.dhruv.smartlock.dto.UnlockRequestDto;
import com.dhruv.smartlock.service.SmartLockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/lock")
@RequiredArgsConstructor
public class SmartLockController {
    private final SmartLockService smartLockService;

    @PostMapping("/unlock")
    public void unlock(@RequestBody UnlockRequestDto unlockRequestDto) {
        log.info("Unlock API called for user={}", unlockRequestDto.getUser());
        smartLockService.unlock(unlockRequestDto.getUser());
    }

    @GetMapping("/battery")
    public void checkBattery(){
        log.info("Battery check API called");
        smartLockService.checkBattery();
    }
}
