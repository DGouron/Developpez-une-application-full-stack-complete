package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Theme;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeRepository extends CrudRepository<Theme, Integer> {
    List<Theme> findAllByOrderByTitleAsc();
} 