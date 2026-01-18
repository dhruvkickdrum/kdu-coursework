package com.dhruv.library.web.controller;

import com.dhruv.library.api.dto.request.CatalogBookRequestDto;
import com.dhruv.library.api.dto.request.CreateBookRequestDto;
import com.dhruv.library.api.dto.response.BookResponseDto;
import com.dhruv.library.service.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @Operation(summary = "Create a new book (ADMIN)")
    @PostMapping
    public BookResponseDto create(@Valid @RequestBody CreateBookRequestDto requestDto) {
        return bookService.create(requestDto.getTitle());
    }

    @Operation(summary = "Catalog a book (ADMIN)")
    @PatchMapping("/{id}/catalog")
    public BookResponseDto catalog(
            @PathVariable UUID id,
            @RequestBody(required = false)CatalogBookRequestDto ignored
            )  {
        return bookService.catalog(id);
    }
    @GetMapping
    public List<BookResponseDto> findAll() {
        return bookService.findAll();
    }
}
