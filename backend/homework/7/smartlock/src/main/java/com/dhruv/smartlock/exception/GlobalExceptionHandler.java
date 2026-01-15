package com.dhruv.smartlock.exception;

import com.dhruv.smartlock.dto.ApiErrorResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HardwareFailureException.class)
    public ResponseEntity<ApiErrorResponseDto> handleHardwareFailure(HardwareFailureException hardwareFailureException) {
        log.warn("Handled hardware failure gracefully :{}", hardwareFailureException.getMessage());

        ApiErrorResponseDto apiErrorResponse = new ApiErrorResponseDto(
                "Hardware_Failure",
                hardwareFailureException.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(apiErrorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponseDto> handleGenericException(Exception ex) {
        log.error("Unhandled exception", ex);

        ApiErrorResponseDto apiErrorResponse = new ApiErrorResponseDto(
                "Internal_Error",
                "Something went wrong. Please try again later"
        );
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(apiErrorResponse);
    }

}