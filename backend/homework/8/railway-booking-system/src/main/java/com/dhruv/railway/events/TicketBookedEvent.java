package com.dhruv.railway.events;

public record TicketBookedEvent (
        String bookingId,
        int age
) {}