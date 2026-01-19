package com.dhruv.library.ticketbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EventRequestDto {

    private String name;
    private int tickets;

}
