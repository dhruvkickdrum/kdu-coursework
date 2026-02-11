package com.dhruv.library.service.mapper;

import com.dhruv.library.api.dto.response.LoanResponseDto;
import com.dhruv.library.domain.entity.LoanEntity;

public class LoanMapper {


    public LoanMapper() {
    }

    public static LoanResponseDto toResponse(LoanEntity loanEntity) {
        return LoanResponseDto.builder()
                .id(loanEntity.getId())
                .bookId(loanEntity.getBook().getId())
                .borrowerId(loanEntity.getBorrower().getId())
                .borrowedAt(loanEntity.getBorrowedAt())
                .returnedAt(loanEntity.getReturnedAt())
                .build();
    }
}
