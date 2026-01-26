package com.dhruv.smarthomedevicemanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateHouseRequestDto {
    @NotBlank(message = "House name is required")
    @Size(max = 200, message = "House name must not exceed 200 charcters")
    private String name;

    @Size(max = 500, message = "Address must not exceed 500 characters")
    private String address;
}
