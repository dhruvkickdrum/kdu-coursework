package com.dhruv.smartlock.exception;

public class HardwareFailureException extends RuntimeException {

    public HardwareFailureException(String message) {
        super(message);
    }
}