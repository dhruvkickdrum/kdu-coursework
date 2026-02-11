package com.dhruv.railway;

import com.dhruv.railway.booking.BookingService;
import com.dhruv.railway.broker.MessageBroker;
import com.dhruv.railway.broker.SimpleQueue;
import com.dhruv.railway.events.PaymentEvent;
import com.dhruv.railway.inventory.InventoryConsumer;
import com.dhruv.railway.notification.NotificationConsumer;
import com.dhruv.railway.payment.PaymentConsumer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RailwayBookingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(RailwayBookingSystemApplication.class, args);
    }

}