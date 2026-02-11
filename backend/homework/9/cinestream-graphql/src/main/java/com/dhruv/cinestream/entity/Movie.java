package com.dhruv.cinestream.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Movie {

    private String id;
    private String title;
    private String genre;
    private String directorId;
    private List<Review> reviews = new ArrayList<>();

    public Movie(String id, String title, String genre, String directorId) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.directorId = directorId;
    }
}
