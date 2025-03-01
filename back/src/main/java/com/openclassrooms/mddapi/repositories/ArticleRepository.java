package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Integer> {
    List<Article> findByAuthor(User author);
    List<Article> findAllByOrderByCreatedAtDesc();
} 