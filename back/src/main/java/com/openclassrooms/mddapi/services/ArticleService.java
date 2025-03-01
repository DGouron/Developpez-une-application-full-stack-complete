package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.ArticleRequestDTO;
import com.openclassrooms.mddapi.dtos.ArticleResponseDTO;
import com.openclassrooms.mddapi.dtos.UserResponseDTO;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.ArticleRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public List<ArticleResponseDTO> getAllArticles() {
        List<Article> articles = new ArrayList<>();
        articleRepository.findAllByOrderByCreatedAtDesc().forEach(articles::add);
        return articles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ArticleResponseDTO> getArticleById(Integer id) {
        return articleRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<ArticleResponseDTO> getArticlesByAuthor(String email) {
        User author = userRepository.findByEmail(email);
        if (author == null) {
            return new ArrayList<>();
        }
        return articleRepository.findByAuthor(author).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ArticleResponseDTO createArticle(ArticleRequestDTO articleRequestDTO, String authorEmail) {
        User author = userRepository.findByEmail(authorEmail);
        if (author == null) {
            throw new IllegalArgumentException("User not found");
        }

        Article article = new Article();
        article.setTitle(articleRequestDTO.getTitle());
        article.setContent(articleRequestDTO.getContent());
        article.setAuthor(author);

        Article savedArticle = articleRepository.save(article);
        return convertToDTO(savedArticle);
    }

    public Optional<ArticleResponseDTO> updateArticle(Integer id, ArticleRequestDTO articleRequestDTO, String authorEmail) {
        Optional<Article> optionalArticle = articleRepository.findById(id);
        if (optionalArticle.isEmpty()) {
            return Optional.empty();
        }

        Article article = optionalArticle.get();
        User author = userRepository.findByEmail(authorEmail);
        
        if (author == null || !article.getAuthor().getId().equals(author.getId())) {
            return Optional.empty();
        }

        article.setTitle(articleRequestDTO.getTitle());
        article.setContent(articleRequestDTO.getContent());

        Article updatedArticle = articleRepository.save(article);
        return Optional.of(convertToDTO(updatedArticle));
    }

    public boolean deleteArticle(Integer id, String authorEmail) {
        Optional<Article> optionalArticle = articleRepository.findById(id);
        if (optionalArticle.isEmpty()) {
            return false;
        }

        Article article = optionalArticle.get();
        User author = userRepository.findByEmail(authorEmail);
        
        if (author == null || !article.getAuthor().getId().equals(author.getId())) {
            return false;
        }

        articleRepository.delete(article);
        return true;
    }

    private ArticleResponseDTO convertToDTO(Article article) {
        ArticleResponseDTO dto = new ArticleResponseDTO();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setCreatedAt(article.getCreatedAt());
        dto.setUpdatedAt(article.getUpdatedAt());
        
        UserResponseDTO authorDTO = new UserResponseDTO();
        authorDTO.setId(article.getAuthor().getId());
        authorDTO.setName(article.getAuthor().getName());
        authorDTO.setEmail(article.getAuthor().getEmail());
        authorDTO.setCreatedAt(article.getAuthor().getCreatedAt());
        authorDTO.setUpdatedAt(article.getAuthor().getUpdatedAt());
        
        dto.setAuthor(authorDTO);
        
        return dto;
    }
} 