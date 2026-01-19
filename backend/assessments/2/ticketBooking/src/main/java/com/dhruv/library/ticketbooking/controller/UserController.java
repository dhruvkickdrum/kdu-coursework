package com.dhruv.library.ticketbooking.controller;

import com.dhruv.library.ticketbooking.dto.CreateUserRequestDto;
import com.dhruv.library.ticketbooking.entity.User;
import com.dhruv.library.ticketbooking.repository.UserRepository;
import com.dhruv.library.ticketbooking.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> save(@Valid @RequestBody CreateUserRequestDto requestDto){

        User user = new User();
        user.setUsername(requestDto.getUsername());
        user.setPassword(requestDto.getPassword());
        user.setRole(requestDto.getRole());

        User saved = userService.save(user);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Page<User> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        return userService.getUsers(page, size);
    }
}


