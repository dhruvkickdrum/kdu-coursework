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
public class CreateRoomRequestDto {
    @NotBlank(message = "Room name is required")
    @Size(max = 200, message = "Room name must not exceed 200 characters")
    private String name;
}
