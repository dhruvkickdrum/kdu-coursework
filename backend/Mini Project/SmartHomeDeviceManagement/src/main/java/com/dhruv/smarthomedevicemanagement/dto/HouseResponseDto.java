package com.dhruv.smarthomedevicemanagement.dto;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HouseResponseDto {
    private Long id;
    private String name;
    private String address;
    private Long adminId;
    private String adminUsername;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
