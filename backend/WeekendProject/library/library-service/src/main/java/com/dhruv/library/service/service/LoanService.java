package com.dhruv.library.service.service;

import com.dhruv.library.api.dto.response.LoanResponseDto;

import java.util.UUID;

public interface LoanService {
    LoanResponseDto borrow(UUID bookId, String username);
    LoanResponseDto returnBook(UUID bookId, String username);

}
