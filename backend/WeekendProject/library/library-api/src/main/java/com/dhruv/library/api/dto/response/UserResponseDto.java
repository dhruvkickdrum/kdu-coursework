package com.dhruv.library.api.dto.response;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.UUID;

@Value
@Builder
public class UserResponseDto {
    UUID id;
    String username;
    String role;
    boolean enabled;
    Instant createdAt;
}
