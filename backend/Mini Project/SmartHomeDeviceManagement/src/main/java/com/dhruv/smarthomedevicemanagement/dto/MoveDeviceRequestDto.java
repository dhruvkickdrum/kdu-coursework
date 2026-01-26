package com.dhruv.smarthomedevicemanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MoveDeviceRequestDto {
    @NotNull(message = "Target roomId is required")
    private Long targetRoomId;
}
