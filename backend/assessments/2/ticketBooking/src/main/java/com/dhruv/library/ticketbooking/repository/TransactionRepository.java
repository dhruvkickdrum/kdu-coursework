package com.dhruv.library.ticketbooking.repository;

import com.dhruv.library.ticketbooking.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {}

