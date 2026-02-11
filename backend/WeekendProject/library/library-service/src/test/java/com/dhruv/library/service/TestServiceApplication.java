package com.dhruv.library.service;

import com.dhruv.library.service.config.TestSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.dhruv.library")
@EntityScan("com.dhruv.library.domain.entity")
@EnableJpaRepositories("com.dhruv.library.domain.repository")
@Import(TestSecurityConfig.class)
public class TestServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TestServiceApplication.class, args);
    }
}
