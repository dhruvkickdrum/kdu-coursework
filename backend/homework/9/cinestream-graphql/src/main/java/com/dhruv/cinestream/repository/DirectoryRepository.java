package com.dhruv.cinestream.repository;

import com.dhruv.cinestream.entity.Director;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class DirectoryRepository {
    private final Map<String, Director> directors = new ConcurrentHashMap<>();

    public DirectoryRepository() {
        save(new Director("1", "Christopher Nolan", 34));
        save(new Director("2", "Steven Spielberg", 58));
    }

    public Optional<Director> findById(String id) {
        return Optional.ofNullable(directors.get(id));
    }

    public Map<String, Director> findByIds(List<String> ids) {
        return ids.stream()
                .distinct()
                .filter(directors::containsKey)
                .collect(Collectors.toMap(
                        id -> id,
                        directors::get
                ));
    }

    public Director save(Director director) {
        directors.put(director.getId(), director);
        return director;
    }
}
