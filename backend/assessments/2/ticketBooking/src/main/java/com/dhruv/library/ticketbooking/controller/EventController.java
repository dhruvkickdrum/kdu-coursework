package com.dhruv.library.ticketbooking.controller;

import com.dhruv.library.ticketbooking.dto.EventRequestDto;
import com.dhruv.library.ticketbooking.entity.Event;
import com.dhruv.library.ticketbooking.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping("/admin")
    public Event create(@RequestBody EventRequestDto requestDto){
        return eventService.create(requestDto.getName(), requestDto.getTickets());
    }

    @GetMapping
    public List<Event> list() {
        return eventService.listAll();
    }

    @PutMapping("/admin/{eventId}/tickets")
    public Event updateTicketCount(
            @PathVariable Long eventId,
            @RequestParam int tickets) {

        return eventService.updateTicketCount(eventId, tickets);
    }

}
