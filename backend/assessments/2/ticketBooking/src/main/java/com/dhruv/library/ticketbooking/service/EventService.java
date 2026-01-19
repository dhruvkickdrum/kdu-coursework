package com.dhruv.library.ticketbooking.service;

import com.dhruv.library.ticketbooking.entity.Event;
import com.dhruv.library.ticketbooking.repository.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public Event create(String name, int tickets){
        Event event = new Event();
        event.setName(name);
        event.setAvailableTickets(tickets);
        return eventRepository.save(event);
    }

    public List<Event> listAll() {
        return  eventRepository.findByDeletedFalse();
    }

    @Transactional
    public Event updateTicketCount(Long eventId, int newCount) {
        if (newCount < 0) {
            throw new RuntimeException("Ticket count cannot be negative");
        }
        Event event = eventRepository.lockEvent(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (event.isDeleted()) {
            throw new RuntimeException("Cannot update deleted event");
        }

        event.setAvailableTickets(newCount);
        return eventRepository.save(event);
    }

}