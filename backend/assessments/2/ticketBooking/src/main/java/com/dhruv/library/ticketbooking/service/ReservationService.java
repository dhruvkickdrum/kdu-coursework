package com.dhruv.library.ticketbooking.service;

import com.dhruv.library.ticketbooking.entity.Event;
import com.dhruv.library.ticketbooking.entity.Reservation;
import com.dhruv.library.ticketbooking.entity.User;
import com.dhruv.library.ticketbooking.repository.EventRepository;
import com.dhruv.library.ticketbooking.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class ReservationService {

    private final EventRepository eventRepo;
    private final ReservationRepository reservationRepo;


    public Long reserve(User user, Long eventId, int tickets) {
        Event event = eventRepo.lockEvent(eventId)
                .orElseThrow();

        if (event.getAvailableTickets() < tickets) {
            throw new RuntimeException("Insufficient tickets");
        }

        event.setAvailableTickets(event.getAvailableTickets() - tickets);

        Reservation res = new Reservation();
        res.setUser(user);
        res.setEvent(event);
        res.setTicketCount(tickets);

        reservationRepo.save(res);
        return res.getId();
    }

    public void deleteReservation(Long id) {
        Reservation res = reservationRepo.findById(id).orElseThrow();
        Event event = eventRepo.lockEvent(res.getEvent().getId()).orElseThrow();

        event.setAvailableTickets(event.getAvailableTickets() + res.getTicketCount());
        reservationRepo.delete(res);
    }
}
