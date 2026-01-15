package com.dhruv.smartlock.service;

public interface SmartLockService {
    void unlock(String user);

    void checkBattery();
}