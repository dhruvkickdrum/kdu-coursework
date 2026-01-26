package com.dhruv.smarthomedevicemanagement.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponseDto {
    private Long id;
    private String name;
    private Long houseId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
