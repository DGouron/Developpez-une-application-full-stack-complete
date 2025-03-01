package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findByArticleOrderByCreatedAtDesc(Article article);
    List<Comment> findByUserOrderByCreatedAtDesc(User user);
    List<Comment> findByArticleAndUserOrderByCreatedAtDesc(Article article, User user);
} 