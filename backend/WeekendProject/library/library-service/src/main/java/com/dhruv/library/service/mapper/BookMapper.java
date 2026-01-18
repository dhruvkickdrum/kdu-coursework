package com.dhruv.library.service.mapper;

import com.dhruv.library.api.dto.response.BookResponseDto;
import com.dhruv.library.domain.entity.BookEntity;

public class BookMapper {

    public BookMapper() {
    }

    public static BookResponseDto toResponse(BookEntity bookEntity) {
        return BookResponseDto.builder()
                .id(bookEntity.getId())
                .title(bookEntity.getTitle())
                .status(bookEntity.getStatus().name())
                .createdAt(bookEntity.getCreatedAt())
                .updatedAt(bookEntity.getUpdatedAt())
                .build();
    }
}
