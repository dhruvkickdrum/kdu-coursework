package com.dhruv.library.ticketbooking.controller;

import com.dhruv.library.ticketbooking.dto.ReservationRequestDto;
import com.dhruv.library.ticketbooking.entity.User;
import com.dhruv.library.ticketbooking.repository.UserRepository;
import com.dhruv.library.ticketbooking.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/reservations")
@AllArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;
    private final UserRepository userRepo;

    @PostMapping
    public Long reserve(@RequestBody ReservationRequestDto req, Principal p) {
        User u = userRepo.findByUsername(p.getName()).orElseThrow();
        return reservationService.reserve(u, req.getEventId(), req.getTickets());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }
}

