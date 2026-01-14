package com.dhruv.hospital.staffing.repository;

import com.dhruv.hospital.staffing.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
