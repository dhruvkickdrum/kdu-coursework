package com.dhruv.library.service.mapper;

import com.dhruv.library.api.dto.response.UserResponseDto;
import com.dhruv.library.domain.entity.UserEntity;

public class UserMapper {

    public UserMapper() {
    }

    public static UserResponseDto toResponse(UserEntity userEntity) {
        return UserResponseDto.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .role(userEntity.getRole().name())
                .enabled(userEntity.isEnabled())
                .createdAt(userEntity.getCreatedAt())
                .build();
    }
}
