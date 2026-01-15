package com.dhruv.smartlock.service;

import com.dhruv.smartlock.annotation.AuditAccess;
import com.dhruv.smartlock.annotation.SecureAccess;
import com.dhruv.smartlock.annotation.TrackPerformance;
import com.dhruv.smartlock.exception.HardwareFailureException;
import com.dhruv.smartlock.repository.SmartLockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmartLockServiceImpl implements SmartLockService {

    private final SmartLockRepository smartLockRepository;

    @Override
    @AuditAccess // For exercise 1
    @SecureAccess // FOr exercise 2
    public void unlock(String user) {
        if(user == null || user.isBlank()) { // Exercise 3 - modified the method to handle the empty string case
            throw new HardwareFailureException("Empty input detected");
        }
        smartLockRepository.openDoor(user);
    }

    @Override
    @TrackPerformance
    public void checkBattery() {
        smartLockRepository.checkBatteryStatus();
    }
}