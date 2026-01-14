package com.dhruv.hospital.staffing.exception;

import com.dhruv.hospital.staffing.dto.ApiErrorResponseDto;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ApiErrorResponseDto handleIllegalArgument(IllegalArgumentException ex) {
        return new ApiErrorResponseDto(ex.getMessage());
    }
}
