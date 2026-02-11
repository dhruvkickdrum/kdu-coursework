package com.dhruv.library.web.error;

import com.dhruv.library.api.error.ApiErrorResponseDto;
import com.dhruv.library.api.error.FieldErrorDetailDto;
import com.dhruv.library.service.exception.BusinessConflictException;
import com.dhruv.library.service.exception.NotFoundException;
import jakarta.persistence.OptimisticLockException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.View;

import java.time.Instant;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponseDto validation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {
        List<FieldErrorDetailDto> details = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(this::mapFieldError)
                .toList();

        return error("VALIDATION_ERROR", "Invalid Request", details, request);
    }


    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponseDto notFound(
            NotFoundException ex,
            HttpServletRequest request
    ) {
        return error(ex.getErrorCode(), ex.getMessage(), List.of(), request);
    }

    @ExceptionHandler(BusinessConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponseDto conflict (
            BusinessConflictException ex,
            HttpServletRequest request
    ) {
        return error(ex.getErrorCode(), ex.getMessage(), List.of(), request);
    }

    @ExceptionHandler(OptimisticLockException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponseDto optimistic(
            OptimisticLockException ex,
            HttpServletRequest request
    ) {
        return error(
                "CONCURRENT_MODIFICATION",
                "Concurrent modification detected",
                List.of(),
                request
        );
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiErrorResponseDto generic(
            Exception ex,
            HttpServletRequest request
    ) {
        return error(
                "INTERNAL_ERROR",
                "Unexpected server error",
                List.of(),
                request
        );
    }

    private ApiErrorResponseDto error(
            String code,
            String message,
            List<FieldErrorDetailDto> details,
            HttpServletRequest request
    ) {
        return ApiErrorResponseDto.builder()
                .timestamp(Instant.now())
                .path(request.getRequestURI())
                .errorCode(code)
                .message(message)
                .details(details)
                .correlationId(MDC.get("correlationId"))
                .build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponseDto illegalArgument(
            IllegalArgumentException ex,
            HttpServletRequest request
    ) {
        return error("CONFLICT", ex.getMessage(), List.of(), request);
    }

    private FieldErrorDetailDto mapFieldError(FieldError fe) {
        return FieldErrorDetailDto.builder()
                .field(fe.getField())
                .issue(fe.getDefaultMessage())
                .build();
    }
}

