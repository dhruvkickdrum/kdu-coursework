package com.dhruv.smarthomedevicemanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddUserToHouseRequestDto {
    @NotNull(message = "User id is required")
    private Long userId;
}
