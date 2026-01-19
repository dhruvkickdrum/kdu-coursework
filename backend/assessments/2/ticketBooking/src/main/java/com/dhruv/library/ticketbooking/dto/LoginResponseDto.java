package com.dhruv.library.ticketbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LoginResponseDto {
    private String token;
    private String tokenType = "Bearer";
    private String userName;
    private String role;

    public LoginResponseDto(String token, String userName, String role) {
        this.token = token;
        this.userName = userName;
        this.role = role;
    }
}
