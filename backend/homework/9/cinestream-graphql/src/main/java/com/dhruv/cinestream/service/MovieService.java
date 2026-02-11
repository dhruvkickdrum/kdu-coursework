package com.dhruv.cinestream.service;

import com.dhruv.cinestream.entity.Movie;
import com.dhruv.cinestream.entity.Review;
import com.dhruv.cinestream.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    public Movie getMoviesById(String id) {
        return movieRepository.findById(id).orElse(null);
    }

    public Movie addReview(String movieId, String comment, int rating) {
        Movie movie = getMoviesById(movieId);
        if(movie != null){
            movie.getReviews().add(new Review(comment, rating));
            movieRepository.save(movie);
        }
        return movie;
    }

    public Movie createMovie(
            String id,
            String title,
            String genre,
            String directorId
    ) {
        Movie movie = new Movie(id, title, genre, directorId);
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

}
