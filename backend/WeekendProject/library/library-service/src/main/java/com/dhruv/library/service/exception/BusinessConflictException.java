package com.dhruv.library.service.exception;

public class BusinessConflictException extends RuntimeException {
    private final String errorCode;

    public BusinessConflictException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
