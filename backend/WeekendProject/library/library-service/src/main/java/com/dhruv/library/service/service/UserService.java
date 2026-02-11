package com.dhruv.library.service.service;

import com.dhruv.library.api.dto.request.CreateUserRequestDto;
import com.dhruv.library.api.dto.response.UserResponseDto;

public interface UserService {
    UserResponseDto create(CreateUserRequestDto request);
}
