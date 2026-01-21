package com.dhruv.cinestream.repository;

import com.dhruv.cinestream.entity.Movie;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MovieRepository {
    private final Map<String, Movie> movies = new ConcurrentHashMap<>();

    public MovieRepository() {
        movies.put("1", new Movie("1", "Inception", "Sci-Fi", "1"));
        movies.put("2", new Movie("2", "Jurassic Park", "Adventure", "2"));
    }

    public Optional<Movie> findById(String id) {
        return Optional.ofNullable(movies.get(id));
    }

    public List<Movie> findAll() {
        return new ArrayList<>(movies.values());
    }

    public Movie save(Movie movie) {
        movies.put(movie.getId(), movie);
        return movie;
    }


}