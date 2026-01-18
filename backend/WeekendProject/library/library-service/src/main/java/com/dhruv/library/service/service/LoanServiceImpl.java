package com.dhruv.library.service.service;

import com.dhruv.library.api.dto.response.LoanResponseDto;
import com.dhruv.library.domain.entity.BookEntity;
import com.dhruv.library.domain.entity.LoanEntity;
import com.dhruv.library.domain.enumtype.BookStatus;
import com.dhruv.library.domain.repository.BookRepository;
import com.dhruv.library.domain.repository.LoanRepository;
import com.dhruv.library.domain.repository.UserRepository;
import com.dhruv.library.service.exception.BusinessConflictException;
import com.dhruv.library.service.exception.NotFoundException;
import com.dhruv.library.service.mapper.LoanMapper;
import jakarta.persistence.OptimisticLockException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class LoanServiceImpl implements LoanService{
    private final BookRepository bookRepository;
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;

    @Override
    public LoanResponseDto borrow(UUID bookId, String username) {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("BOOK_NOT_FOUND", "Book Not found"));

        if(book.getStatus() != BookStatus.AVAILABLE) {
            throw new BusinessConflictException("BOOK_NOT_AVAILABLE" , "Book is not available");
        }

        var borrower = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));


        try{
            book.setStatus(BookStatus.CHECKED_OUT);
            LoanEntity loan = new LoanEntity();
            loan.setBook(book);
            loan.setBorrower(borrower);
            return LoanMapper.toResponse(loanRepository.save(loan));
        } catch (OptimisticLockException e) {
            throw new com.dhruv.library.service.exception.ConcurrentModificationException("Concurrent book modification");
        }
    }

    @Override
    public LoanResponseDto returnBook(UUID bookId, String username) {
        LoanEntity loan = loanRepository.findByBook_IdAndReturnedAtIsNull(bookId)
                .orElseThrow(() -> new BusinessConflictException("NO_ACTIVE_LOAN", "No active loan for this book"));

        if(!loan.getBorrower().getUsername().equals(username)) {
            throw new BusinessConflictException("NOT_BORROWER", "Only borrower can return this book");
        }

        loan.setReturnedAt(java.time.Instant.now());
        loan.getBook().setStatus(BookStatus.AVAILABLE);

        return LoanMapper.toResponse(loan);
    }
}
