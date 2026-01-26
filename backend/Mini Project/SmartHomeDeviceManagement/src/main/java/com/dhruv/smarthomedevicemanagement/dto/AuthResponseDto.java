package com.dhruv.smarthomedevicemanagement.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDto {
    private String token;
    private String type = "Bearer";
    private Long userId;
    private String username;
    private String email;
}
