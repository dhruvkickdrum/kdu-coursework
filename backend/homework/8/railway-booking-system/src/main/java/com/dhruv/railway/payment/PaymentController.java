package com.dhruv.railway.payment;

import com.dhruv.railway.events.PaymentEvent;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentConsumer paymentConsumer;
    public PaymentController(PaymentConsumer paymentConsumer) {
        this.paymentConsumer = paymentConsumer;
    }

    @PostMapping
    public ResponseEntity<String> triggerPayment(@RequestBody PaymentEvent event) {
        paymentConsumer.queue().enqueue(event);

        return ResponseEntity.accepted().body("Payment event accepted for processing");
    }
}
