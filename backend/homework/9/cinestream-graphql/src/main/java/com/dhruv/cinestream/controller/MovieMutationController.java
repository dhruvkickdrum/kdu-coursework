package com.dhruv.cinestream.controller;

import com.dhruv.cinestream.entity.Director;
import com.dhruv.cinestream.entity.Movie;
import com.dhruv.cinestream.service.DirectorService;
import com.dhruv.cinestream.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MovieMutationController {
    private final MovieService movieService;
    private final DirectorService directorService;

    @MutationMapping
    public Movie addReview(
            @Argument String movieId,
            @Argument String comment,
            @Argument int rating
    ) {
        return movieService.addReview(movieId, comment, rating);
    }

    @MutationMapping
    public Director addDirector(
            @Argument String id,
            @Argument String name,
            @Argument int totalAwards
    ) {
        return directorService.createDirector(id, name, totalAwards);
    }

    @MutationMapping
    public Movie addMovie(
            @Argument String id,
            @Argument String title,
            @Argument String genre,
            @Argument String directorId
    ) {
        return movieService.createMovie(id, title, genre, directorId);
    }
}
