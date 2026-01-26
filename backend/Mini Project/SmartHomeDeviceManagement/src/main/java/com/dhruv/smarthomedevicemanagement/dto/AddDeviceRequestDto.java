package com.dhruv.smarthomedevicemanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddDeviceRequestDto {
    @NotBlank(message = "Kickston id is required")
    @Pattern(regexp = "^[0-9A-Fa-f]{6}$", message = "Kickston id must be 6 digit hexadecimal value")
    private String kickstonId;

    @NotBlank(message = "Device username is required")
    private String deviceUsername;

    @NotBlank(message = "Device password is required")
    private String devicePassword;

    @Size(max = 200, message = "Device name must not exceed 200 characters")
    private String deviceName;

    private Long roomId;
}
