package com.dhruv.railway.inventory;

import com.dhruv.railway.broker.DeadLetterQueue;
import com.dhruv.railway.broker.SimpleQueue;
import com.dhruv.railway.broker.MessageBroker;
import com.dhruv.railway.events.TicketBookedEvent;
import com.dhruv.railway.retry.RetryHandler;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class InventoryConsumer {

    private static final Logger log = LoggerFactory.getLogger(InventoryConsumer.class);
    private final SimpleQueue queue = new SimpleQueue();
    private final DeadLetterQueue dlq;
    private final MessageBroker broker;
    private final RetryHandler retryHandler;

    public InventoryConsumer(MessageBroker broker, DeadLetterQueue dlq, RetryHandler retryHandler) {
        this.broker = broker;
        this.dlq = dlq;
        this.retryHandler = retryHandler;
    }

    @PostConstruct
    void init() {
        broker.subscribe("ticket-booked", queue);
        new Thread(this::consume).start();
    }

    private void consume() {
        while (true) {
            try {
                TicketBookedEvent event = (TicketBookedEvent) queue.dequeue();
                retryHandler.processWithRetry(event.bookingId(), () -> validateAndAllocate(event), dlq);
            } catch (Exception e) {
                log.error("Unexpected inventory error", e);
            }
        }
    }

    private void validateAndAllocate(TicketBookedEvent event) {
        if (event.age() < 0) {
            throw new IllegalArgumentException("Invalid age: " + event.age());
        }
        log.info("Seat allocated for booking {}", event.bookingId());
    }
}
