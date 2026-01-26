package com.dhruv.smarthomedevicemanagement.services;

import com.dhruv.smarthomedevicemanagement.dto.AuthResponseDto;
import com.dhruv.smarthomedevicemanagement.dto.LoginRequestDto;
import com.dhruv.smarthomedevicemanagement.dto.RegisterRequestDto;
import com.dhruv.smarthomedevicemanagement.entity.Role;
import com.dhruv.smarthomedevicemanagement.entity.User;
import com.dhruv.smarthomedevicemanagement.exception.BadRequestException;
import com.dhruv.smarthomedevicemanagement.exception.InvalidCredentialsException;
import com.dhruv.smarthomedevicemanagement.repository.UserRepository;
import com.dhruv.smarthomedevicemanagement.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponseDto register(RegisterRequestDto requestDto) {
        log.info("Registering new user : {}", requestDto.getUsername());
        if(userRepository.existsByUsername(requestDto.getUsername())) {
            throw new BadRequestException("Username allready exists");
        }
        if(userRepository.existsByEmail(requestDto.getEmail())) {
            throw new BadRequestException("Email allready exists");
        }

        User user = User.builder()
                .username(requestDto.getUsername())
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .firstName(requestDto.getFirstName())
                .lastName(requestDto.getLastName())
                .role(Role.USER)
                .build();

        user = userRepository.save(user);
        log.info("User registered successfully : {}", user.getUsername());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDto.getUsername(), requestDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        return AuthResponseDto.builder()
                .token(token)
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }

    public AuthResponseDto login(LoginRequestDto requestDto) {
        log.info("User login attemp : {}", requestDto.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestDto.getUsername(), requestDto.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);

            User user = userRepository.findByUsername(requestDto.getUsername()).orElseThrow(() -> new InvalidCredentialsException("Invalid Credentials"));

            log.info("user logged in successfully : {}", requestDto.getUsername());
            return AuthResponseDto.builder()
                    .token(token)
                    .userId(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .build();
        } catch (Exception e){
            log.error("Login failed for user : {}", requestDto.getUsername());
            throw new InvalidCredentialsException("Invalid username and password");
        }
    }
}
