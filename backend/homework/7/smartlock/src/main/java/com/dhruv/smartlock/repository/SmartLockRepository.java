package com.dhruv.smartlock.repository;

import com.dhruv.smartlock.exception.BatteryHardwareException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
public class SmartLockRepository {
    public void openDoor(String user) {
        log.info("Door hardware triggered for user : {}", user);
    }

    public void checkBatteryStatus() {
        boolean sensorHealthy = false;

        if (!sensorHealthy) {
            throw new BatteryHardwareException("Battery sensor failure");
        }
        try {
            Thread.sleep(3000); // Hardware call
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Battery check interrupted", e);
        }
        log.info("Battery level is sufficient");
    }
}