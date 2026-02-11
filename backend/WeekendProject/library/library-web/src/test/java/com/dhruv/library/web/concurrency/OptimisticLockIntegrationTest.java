package com.dhruv.library.web.concurrency;

import com.dhruv.library.domain.entity.BookEntity;
import com.dhruv.library.domain.entity.UserEntity;
import com.dhruv.library.domain.enumtype.BookStatus;
import com.dhruv.library.domain.enumtype.UserRole;
import com.dhruv.library.domain.repository.BookRepository;
import com.dhruv.library.domain.repository.UserRepository;
import com.dhruv.library.service.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.UUID;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class OptimisticLockIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    BookRepository bookRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;

    @Test
    void concurrentBorrow_shouldReturn409() throws Exception {

        UserEntity member = new UserEntity();
        member.setUsername("member");
        member.setPassword("x");              // not used since auth is via JWT subject
        member.setRole(UserRole.MEMBER);      // adjust enum name
        member.setEnabled(true);
        member.setCreatedAt(Instant.now());   // if non-null in schema
        userRepository.save(member);

        BookEntity book = new BookEntity();
        book.setTitle("Concurrent Book");
        book.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book);

        String token = jwtService.generateToken(
                "member",
                List.of("ROLE_MEMBER")
        );

        UUID bookId = book.getId();

        mockMvc.perform(post("/loans/" + bookId + "/borrow")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful());

        mockMvc.perform(post("/loans/" + bookId + "/borrow")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict());
    }
}
