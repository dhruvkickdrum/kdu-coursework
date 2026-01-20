package com.dhruv.railway.booking;
import com.dhruv.railway.model.BookingRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
@AllArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public String book(@RequestBody BookingRequest request) {
        bookingService.book(request);
        return "Booking in progress";
    }
}