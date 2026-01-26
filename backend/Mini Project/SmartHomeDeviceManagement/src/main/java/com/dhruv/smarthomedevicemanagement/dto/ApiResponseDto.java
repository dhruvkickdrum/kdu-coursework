package com.dhruv.smarthomedevicemanagement.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseDto<T> {
    private Boolean success;
    private String message;
    private T data;
    private LocalDateTime timeStamp;

    public static <T> ApiResponseDto<T> success(T data) {
        return ApiResponseDto.<T>builder()
                .success(true)
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponseDto<T> success(String message, T data) {
        return ApiResponseDto.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponseDto<T> error(String message) {
        return ApiResponseDto.<T>builder()
                .success(false)
                .message(message)
                .timeStamp(LocalDateTime.now())
                .build();
    }
}
