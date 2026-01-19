package com.dhruv.library.ticketbooking.controller;

import com.dhruv.library.ticketbooking.dto.LoginRequestDto;
import com.dhruv.library.ticketbooking.dto.LoginResponseDto;
import com.dhruv.library.ticketbooking.security.AuditLogger;
import com.dhruv.library.ticketbooking.security.JwtService;
import com.dhruv.library.ticketbooking.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final AuditLogger auditLogger;


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto reqDto) {
        var user = authService.authenticate(reqDto.getUserName(), reqDto.getPassword());
        String token = jwtService.generateToken(user.getUsername(), user.getRole());
        auditLogger.loginSuccess(user.getUsername());

        return ResponseEntity.ok(new LoginResponseDto(token , user.getUsername(), user.getRole()));
    }
}
