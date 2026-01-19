package com.dhruv.library.ticketbooking.service;

import com.dhruv.library.ticketbooking.entity.Booking;
import com.dhruv.library.ticketbooking.entity.Event;
import com.dhruv.library.ticketbooking.entity.Reservation;
import com.dhruv.library.ticketbooking.entity.Transaction;
import com.dhruv.library.ticketbooking.repository.BookingRepository;
import com.dhruv.library.ticketbooking.repository.EventRepository;
import com.dhruv.library.ticketbooking.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class BookingService {
    private final ReservationRepository reservationRepository;
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;


    public Long confirm(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow();

        Booking booking = new Booking();
        booking.setUser(reservation.getUser());
        booking.setEvent(reservation.getEvent());
        booking.setTicketCount(reservation.getTicketCount());

        Transaction transaction = new Transaction();
        transaction.setTransactionId(UUID.randomUUID().toString());
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus("SUCCESS");

        booking.setTransaction(transaction);

        bookingRepository.save(booking);
        reservationRepository.delete(reservation);
        return booking.getId();

    }

    @Transactional
    public void cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Event event = eventRepository.lockEvent(booking.getEvent().getId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setAvailableTickets(
                event.getAvailableTickets() + booking.getTicketCount()
        );

        booking.getTransaction().setStatus("CANCELLED");

        bookingRepository.delete(booking);
    }
}
