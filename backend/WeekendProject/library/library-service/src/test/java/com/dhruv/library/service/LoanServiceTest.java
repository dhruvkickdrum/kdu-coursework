package com.dhruv.library.service;

import com.dhruv.library.domain.entity.BookEntity;
import com.dhruv.library.domain.entity.UserEntity;
import com.dhruv.library.domain.enumtype.BookStatus;
import com.dhruv.library.domain.enumtype.UserRole;
import com.dhruv.library.domain.repository.BookRepository;
import com.dhruv.library.domain.repository.UserRepository;
import com.dhruv.library.service.exception.BusinessConflictException;
import com.dhruv.library.service.service.LoanService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest(classes = TestServiceApplication.class)
@ActiveProfiles("test")
public class LoanServiceTest {
    @Autowired
    LoanService loanService;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    void setUpSecurityContext() {
        var auth = new UsernamePasswordAuthenticationToken("member", "N/A", List.of());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void onlyBorrowerCanReturnBook(){
        UserEntity user = new UserEntity();
        user.setUsername("member");
        user.setPassword("x");
        user.setRole(UserRole.MEMBER);
        userRepository.save(user);

        BookEntity book = new BookEntity();
        book.setTitle("Test Book");
        book.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book);

        loanService.borrow(book.getId(), "member");

        assertThatThrownBy(() ->
                loanService.returnBook(book.getId(), "otherUser"))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessageContaining("Only borrower");
    }
}
