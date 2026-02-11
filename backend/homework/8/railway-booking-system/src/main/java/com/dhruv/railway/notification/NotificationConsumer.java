package com.dhruv.railway.notification;

import com.dhruv.railway.broker.SimpleQueue;
import com.dhruv.railway.broker.MessageBroker;
import com.dhruv.railway.events.TicketBookedEvent;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private static final Logger log = LoggerFactory.getLogger(NotificationConsumer.class);
    private final MessageBroker broker;

    private final SimpleQueue queue = new SimpleQueue();

    @PostConstruct
    public void init() {
        broker.subscribe("ticket-booked", queue);
        new Thread(this::consume).start();
        log.info("NotificationConsumer started and subscribed to ticket-booked");
    }

    private void consume() {
        while (true) {
            try {
                TicketBookedEvent event = (TicketBookedEvent) queue.dequeue();
                log.info("SMS sent for booking {}", event.bookingId());
            } catch (Exception e) {
                log.error("Error while sending notification", e);
            }
        }
    }
}
