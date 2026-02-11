package com.dhruv.cinestream.service;

import com.dhruv.cinestream.entity.Director;
import com.dhruv.cinestream.repository.DirectoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DirectorService {
    private final DirectoryRepository directorRepository;

    public Director getDirectorById(String id) {
        return directorRepository.findById(id).orElse(null);
    }

    public Map<String, Director> getDirectorsByIds(List<String> ids) {
        return directorRepository.findByIds(ids);
    }

    public Director createDirector(String id, String name, int awards) {
        Director director = new Director(id, name, awards);
        return directorRepository.save(director);
    }
}
