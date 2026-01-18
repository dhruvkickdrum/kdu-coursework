package com.dhruv.library.service.service;

import com.dhruv.library.api.dto.response.BookResponseDto;

import java.util.List;
import java.util.UUID;

public interface BookService {
    BookResponseDto create(String title);

    BookResponseDto catalog(UUID bookId);
    List<BookResponseDto> findAll();
}
