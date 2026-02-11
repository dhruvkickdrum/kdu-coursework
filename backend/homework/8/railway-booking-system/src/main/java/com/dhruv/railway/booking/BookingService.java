package com.dhruv.railway.booking;

import com.dhruv.railway.broker.MessageBroker;
import com.dhruv.railway.events.TicketBookedEvent;
import com.dhruv.railway.model.BookingRequest;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookingService {

    private static final Logger log = LoggerFactory.getLogger(BookingService.class);
    private final MessageBroker broker;

    public void book(BookingRequest request) {
        log.info("Received booking {}", request.getBookingId());
        broker.publish("ticket-booked", new TicketBookedEvent(request.getBookingId(), request.getAge()));
    }
}
