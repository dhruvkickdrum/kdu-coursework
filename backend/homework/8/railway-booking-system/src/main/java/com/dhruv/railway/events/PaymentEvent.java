package com.dhruv.railway.events;

public record PaymentEvent (
        String transactionId,
        double amount
) {}