package com.dhruv.library.web.controller;

import com.dhruv.library.api.dto.request.CreateUserRequestDto;
import com.dhruv.library.api.dto.response.UserResponseDto;
import com.dhruv.library.service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDto create(@Valid @RequestBody CreateUserRequestDto requestDto) {
        return userService.create(requestDto);
    }
}