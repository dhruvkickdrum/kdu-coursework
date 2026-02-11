package com.dhruv.railway.retry;

import com.dhruv.railway.broker.DeadLetterQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class RetryHandler {

    private static final Logger log = LoggerFactory.getLogger(RetryHandler.class);

    public void processWithRetry(
            String bookingId,
            Runnable action,
            DeadLetterQueue dlq
    ) {
        int attempts = 0;
        while (attempts < 3) {
            try {
                attempts++;
                action.run();
                return; // success
            } catch (Exception ex) {
                log.error("Retry {} failed for booking {}", attempts, bookingId);
            }
        }
        dlq.enqueue(bookingId);
        log.error("Moved booking {} to DLQ after 3 failures", bookingId);
    }
}
