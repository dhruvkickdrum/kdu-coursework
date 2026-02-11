package com.dhruv.library.api.dto.response;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.UUID;

@Value
@Builder
public class BookResponseDto {
    UUID id;
    String title;
    String status;
    Instant createdAt;
    Instant updatedAt;

}
