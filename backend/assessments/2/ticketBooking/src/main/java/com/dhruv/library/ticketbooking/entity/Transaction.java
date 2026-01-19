package com.dhruv.library.ticketbooking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "transactions")
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;
    private String transactionId;
    private LocalDateTime transactionDate;
    private String status;
}
