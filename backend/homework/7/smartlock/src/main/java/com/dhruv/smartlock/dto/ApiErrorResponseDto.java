package com.dhruv.smartlock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiErrorResponseDto {
    private String error;
    private String message;

}
