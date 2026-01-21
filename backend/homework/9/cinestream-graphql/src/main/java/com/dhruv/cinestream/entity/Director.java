package com.dhruv.cinestream.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class Director {
    private String id;
    private String name;
    private int totalAwards;
}
