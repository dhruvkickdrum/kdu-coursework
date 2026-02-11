package com.dhruv.cinestream.controller;

import com.dhruv.cinestream.entity.Director;
import com.dhruv.cinestream.entity.Movie;
import com.dhruv.cinestream.service.DirectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.BatchMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class MovieFieldResolver {

    private final DirectorService directorService;

    // Single resolution
//    @SchemaMapping(typeName = "Movie", field = "director")
//    public Director resolveDirector(Movie movie) {
//        return directorService.getDirectorById(movie.getDirectorId());
//    }

    // Batch resolution (N+1 fix)
    @BatchMapping(typeName = "Movie", field = "director")
    public Map<Movie, Director> batchResolveDirector(List<Movie> movies) {

        List<String> ids = movies.stream()
                .map(Movie::getDirectorId)
                .toList();

        Map<String, Director> directors = directorService.getDirectorsByIds(ids);

        return movies.stream()
                .collect(Collectors.toMap(
                        movie -> movie,
                        movie -> directors.get(movie.getDirectorId())
                ));
    }
}
