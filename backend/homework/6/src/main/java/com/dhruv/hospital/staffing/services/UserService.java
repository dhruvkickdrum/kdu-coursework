package com.dhruv.hospital.staffing.services;

import com.dhruv.hospital.staffing.entity.User;
import com.dhruv.hospital.staffing.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User save(User user) {
        return repo.save(user);
    }

    public Page<User> getUsers(int page, int size) {
        if(size < 1 || size > 50) {
            throw new IllegalArgumentException("Page size must be between 1 and 50");
        }
        return repo.findAll(PageRequest.of(page,size));
    }
}
