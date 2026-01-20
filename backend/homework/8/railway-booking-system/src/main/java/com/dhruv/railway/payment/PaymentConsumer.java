package com.dhruv.railway.payment;

import com.dhruv.railway.broker.SimpleQueue;
import com.dhruv.railway.events.PaymentEvent;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentConsumer {

    private static final Logger log = LoggerFactory.getLogger(PaymentConsumer.class);

    private final SimpleQueue queue = new SimpleQueue();
    private final IdempotencyStore store;

    @PostConstruct
    void start() {
        new Thread(this::consume).start();
    }

    private void consume() {
        while (true) {
            try {
                PaymentEvent event = (PaymentEvent) queue.dequeue();

                if (store.allreadyProcessed(event.transactionId())) {
                    log.warn("Transaction {} already processed", event.transactionId());
                    continue;
                }
                log.info("Money deducted: {}", event.amount());
            } catch (Exception e) {
                log.error("Payment failed", e);
            }
        }
    }

    public SimpleQueue queue() {
        return queue;
    }
}
