package com.dhruv.smarthomedevicemanagement.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HouseUserResponseDto {
    private Long houseId;
    private List<UserWithRoleDto> users;
}
