package com.dhruv.library.web.controller;

import com.dhruv.library.api.dto.response.LoanResponseDto;
import com.dhruv.library.service.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {
    private final LoanService loanService;

    @PostMapping("/{bookId}/borrow")
    public LoanResponseDto borrow(
            @PathVariable("bookId") UUID bookId,
            Authentication authentication
            ) {
        return loanService.borrow(bookId, authentication.getName());
    }

    @PostMapping("/{bookId}/return")
    public LoanResponseDto returnBook(
            @PathVariable("bookId") UUID bookId,
            Authentication authentication
    ) {
        return loanService.returnBook(bookId, authentication.getName());
    }
}
