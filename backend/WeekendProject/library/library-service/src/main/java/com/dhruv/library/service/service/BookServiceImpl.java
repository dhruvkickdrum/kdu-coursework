package com.dhruv.library.service.service;

import com.dhruv.library.api.dto.response.BookResponseDto;
import com.dhruv.library.domain.entity.BookEntity;
import com.dhruv.library.domain.enumtype.BookStatus;
import com.dhruv.library.domain.repository.BookRepository;
import com.dhruv.library.service.exception.BusinessConflictException;
import com.dhruv.library.service.exception.NotFoundException;
import com.dhruv.library.service.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Override
    public BookResponseDto create(String title) {
        BookEntity book = new BookEntity();
        book.setTitle(title);
        book.setStatus(BookStatus.PROCESSING);
        return BookMapper.toResponse(bookRepository.save(book));
    }

    @Override
    public BookResponseDto catalog(UUID bookId) {
        BookEntity book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("BOOK_NOT_FOUND", "Book bot found"));

        if(book.getStatus() != BookStatus.PROCESSING) {
            throw new BusinessConflictException(
                    "INVALID_STATE_TRANSITION",
                    "Only PROCESSING books can be cataloged"
            );
        }
        book.setStatus(BookStatus.AVAILABLE);
        return BookMapper.toResponse(book);
    }

    @Override
    public List<BookResponseDto> findAll() {
        return bookRepository.findAll()
                .stream()
                .map(BookMapper::toResponse)
                .toList();
    }
}
