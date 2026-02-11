package com.dhruv.library.api.dto.response;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.UUID;

@Value
@Builder
public class LoanResponseDto {
    UUID id;
    UUID bookId;
    UUID borrowerId;
    Instant borrowedAt;
    Instant returnedAt;
}
