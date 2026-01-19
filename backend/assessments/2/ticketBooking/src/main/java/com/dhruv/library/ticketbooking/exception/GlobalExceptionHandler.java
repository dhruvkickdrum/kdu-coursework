package com.dhruv.library.ticketbooking.exception;

import com.dhruv.library.ticketbooking.dto.ApiErrorResponseDto;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ApiErrorResponseDto handleIllegalArgument(IllegalArgumentException ex) {
        return new ApiErrorResponseDto(ex.getMessage());
    }
}
