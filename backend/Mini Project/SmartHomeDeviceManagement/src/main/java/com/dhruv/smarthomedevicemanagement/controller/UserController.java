package com.dhruv.smarthomedevicemanagement.controller;

import com.dhruv.smarthomedevicemanagement.dto.ApiResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.UserResponseDto;
import com.dhruv.smarthomedevicemanagement.entity.User;
import com.dhruv.smarthomedevicemanagement.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // Return the user detail by userId;
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponseDto<UserResponseDto>> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        UserResponseDto responseDto = UserResponseDto.builder()
                .username(user.getUsername())
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
        return ResponseEntity.ok(ApiResponseDto.success(responseDto));
    }

    // return the list of all user present in the database any login user can request this.
    @GetMapping
    public ResponseEntity<ApiResponseDto<List<UserResponseDto>>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        List<UserResponseDto> responseDtos = users.stream()
                .map(user -> UserResponseDto.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .build())
                .toList();
        return ResponseEntity.ok(ApiResponseDto.success(responseDtos));
    }
}
