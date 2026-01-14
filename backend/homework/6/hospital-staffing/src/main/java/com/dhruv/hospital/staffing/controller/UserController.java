package com.dhruv.hospital.staffing.controller;

import com.dhruv.hospital.staffing.entity.User;
import com.dhruv.hospital.staffing.repository.UserRepository;
import com.dhruv.hospital.staffing.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService service;
    private final UserRepository repo;


    public UserController(UserService service, UserRepository repo) {
        this.service = service;
        this.repo = repo;
    }

    @PostMapping
    public User save(@RequestBody User user){
        return service.save(user);
    }

    @GetMapping
    public Page<User> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        return service.getUsers(page, size);
    }
}
