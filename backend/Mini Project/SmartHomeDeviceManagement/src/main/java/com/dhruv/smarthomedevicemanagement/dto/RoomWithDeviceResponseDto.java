package com.dhruv.smarthomedevicemanagement.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomWithDeviceResponseDto {
    private Long id;
    private String name;
    private Long houseId;
    private List<DeviceResponseDto> devices;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
