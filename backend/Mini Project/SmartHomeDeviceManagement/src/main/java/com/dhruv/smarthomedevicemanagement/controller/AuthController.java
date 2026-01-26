package com.dhruv.smarthomedevicemanagement.controller;

import com.dhruv.smarthomedevicemanagement.dto.ApiResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.AuthResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.LoginRequestDto;
import com.dhruv.smarthomedevicemanagement.dto.RegisterRequestDto;
import com.dhruv.smarthomedevicemanagement.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // Registering the user for the first time, and save the user detail in the database
    @PostMapping("/register")
    public ResponseEntity<ApiResponseDto<AuthResponseDto>> register(@Valid @RequestBody RegisterRequestDto requestDto) {
        AuthResponseDto responseDto = authService.register(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDto.success("User registred successfully", responseDto));
    }

    // Login the user using the user credentials (username and password )
    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto<AuthResponseDto>> login(@Valid @RequestBody LoginRequestDto requestDto){
        AuthResponseDto responseDto = authService.login(requestDto);
        return ResponseEntity.ok(ApiResponseDto.success("Login Successfull", responseDto));
    }
}
