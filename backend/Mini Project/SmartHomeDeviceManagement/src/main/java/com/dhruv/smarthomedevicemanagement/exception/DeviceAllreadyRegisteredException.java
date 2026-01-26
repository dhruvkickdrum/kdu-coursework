package com.dhruv.smarthomedevicemanagement.exception;

public class DeviceAllreadyRegisteredException extends RuntimeException{
    public DeviceAllreadyRegisteredException(String message) {
        super(message);
    }
}
