package com.dhruv.library.ticketbooking.controller;

import com.dhruv.library.ticketbooking.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
@AllArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/{reservationId}")
    public Long confirm(@PathVariable Long reservationId) {
        return bookingService.confirm(reservationId);
    }

    @DeleteMapping("/{bookingId}")
    public void cancel(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

}
