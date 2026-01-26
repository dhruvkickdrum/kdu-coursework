package com.dhruv.smarthomedevicemanagement.services;

import com.dhruv.smarthomedevicemanagement.dto.UserResponseDto;
import com.dhruv.smarthomedevicemanagement.entity.User;
import com.dhruv.smarthomedevicemanagement.exception.ResourceNotFoundException;
import com.dhruv.smarthomedevicemanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    }

    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        return userRepository.findByIdAndDeletedAtIsNull(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
