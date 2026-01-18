package com.dhruv.library.service.service;


import com.dhruv.library.api.dto.request.CreateUserRequestDto;
import com.dhruv.library.api.dto.response.UserResponseDto;
import com.dhruv.library.domain.entity.UserEntity;
import com.dhruv.library.domain.enumtype.UserRole;
import com.dhruv.library.domain.repository.UserRepository;
import com.dhruv.library.service.exception.BusinessConflictException;
import com.dhruv.library.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto create(CreateUserRequestDto request) {

        userRepository.findByUsername(request.getUsername())
                .ifPresent(u -> {
                    throw new BusinessConflictException(
                            "USERNAME_ALREADY_EXISTS",
                            "Username already exists"
                    );
                });

        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.valueOf(request.getRole()));
        user.setEnabled(true);

        return UserMapper.toResponse(userRepository.save(user));
    }
}
