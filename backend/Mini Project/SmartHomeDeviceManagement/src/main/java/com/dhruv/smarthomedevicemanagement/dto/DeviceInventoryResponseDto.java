package com.dhruv.smarthomedevicemanagement.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceInventoryResponseDto {
    private String kickstonId;
    private String deviceUsername;
    private String devicePassword;
    private boolean isRegistered;
    private LocalDateTime manufactureDateTime;
    private String manufactureFactoryPlace;
}
