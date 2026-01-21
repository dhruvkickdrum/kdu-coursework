package com.dhruv.cinestream.controller;

import com.dhruv.cinestream.entity.Director;
import com.dhruv.cinestream.entity.Movie;
import com.dhruv.cinestream.service.DirectorService;
import com.dhruv.cinestream.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MovieQueryController {
    private final MovieService movieService;
    private final DirectorService directorService;

    @QueryMapping
    public Movie findMovieById(@Argument String id) {
        return movieService.getMoviesById(id);
    }

    @QueryMapping
    public List<Movie> findAllMovies() {
        return movieService.getAllMovies();
    }

    @QueryMapping
    public Director findDirectorById(@Argument String id) {
        return directorService.getDirectorById(id);
    }
}
