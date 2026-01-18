package com.dhruv.library.api.error;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.List;

@Value
@Builder
public class ApiErrorResponseDto {
    Instant timestamp;
    String path;
    String errorCode;
    String message;
    List<FieldErrorDetailDto> details;
    String correlationId;
}
