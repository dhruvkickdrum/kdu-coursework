package com.dhruv.library.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.dhruv.library")
@EntityScan("com.dhruv.library.domain")
@EnableJpaRepositories("com.dhruv.library.domain.repository")
public class LibraryWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryWebApplication.class, args);
    }
}
