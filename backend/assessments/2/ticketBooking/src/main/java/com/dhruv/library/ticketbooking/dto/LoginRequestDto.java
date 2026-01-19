package com.dhruv.library.ticketbooking.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LoginRequestDto {
    @NotBlank
    private String userName;

    @NotBlank
    private String password;
}
