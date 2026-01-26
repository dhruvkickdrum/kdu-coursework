package com.dhruv.smarthomedevicemanagement.dto;

import com.dhruv.smarthomedevicemanagement.entity.DeviceStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeviceResponseDto {
    private Long id;
    private String name;
    private String kickstonId;
    private Long houseId;
    private Long roomId;
    private String roomName;
    private DeviceStatus status;
    private String manufactureFactoryPlace;
    private LocalDateTime manufactureDateTime;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
