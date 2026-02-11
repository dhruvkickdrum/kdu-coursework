package com.dhruv.library.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "loans",
    indexes = {
        @Index(name = "idx_loan_book", columnList = "book_id"),
        @Index(name = "idx_loan_borrower", columnList = "borrower_id")
    }
)
@Getter
@Setter
@NoArgsConstructor
public class LoanEntity {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private BookEntity book;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "borrower_id", nullable = false)
    private UserEntity borrower;

    @Column(nullable = false, updatable = false)
    private Instant borrowedAt;

    @Column
    private Instant returnedAt;

    @PrePersist
    void onCreate() {
        this.id = UUID.randomUUID();
        this.borrowedAt = Instant.now();
    }

    public boolean isActive() {
        return returnedAt == null;
    }
}
