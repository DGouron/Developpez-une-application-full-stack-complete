package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.CreateCommentRequestDTO;
import com.openclassrooms.mddapi.dtos.CreateCommentResponseDTO;
import com.openclassrooms.mddapi.dtos.DeleteCommentResponseDTO;
import com.openclassrooms.mddapi.dtos.GetCommentsResponseDTO;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.ArticleRepository;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public List<GetCommentsResponseDTO> getCommentsByArticleId(Integer articleId) {
        Optional<Article> articleOptional = articleRepository.findById(articleId);
        if (articleOptional.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<Comment> comments = commentRepository.findByArticleOrderByCreatedAtDesc(articleOptional.get());
        return comments.stream()
                .map(this::convertToGetDTO)
                .collect(Collectors.toList());
    }

    public List<GetCommentsResponseDTO> getUserComments(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            return new ArrayList<>();
        }
        
        List<Comment> comments = commentRepository.findByUserOrderByCreatedAtDesc(user);
        return comments.stream()
                .map(this::convertToGetDTO)
                .collect(Collectors.toList());
    }

    public CreateCommentResponseDTO createComment(CreateCommentRequestDTO requestDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        Optional<Article> articleOptional = articleRepository.findById(requestDTO.getArticleId());
        if (articleOptional.isEmpty()) {
            throw new IllegalArgumentException("Article not found");
        }
        
        Article article = articleOptional.get();
        
        Comment comment = new Comment();
        comment.setContent(requestDTO.getContent());
        comment.setUser(user);
        comment.setArticle(article);

        Comment savedComment = commentRepository.save(comment);
        return convertToCreateDTO(savedComment);
    }

    public DeleteCommentResponseDTO deleteComment(Integer id, String userEmail) {
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isEmpty()) {
            return new DeleteCommentResponseDTO(false, "Comment not found");
        }

        Comment comment = commentOptional.get();
        User user = userRepository.findByEmail(userEmail);
        
        if (user == null) {
            return new DeleteCommentResponseDTO(false, "User not found");
        }
        
        if (!comment.getUser().getId().equals(user.getId())) {
            return new DeleteCommentResponseDTO(false, "You are not authorized to delete this comment");
        }

        commentRepository.delete(comment);
        return new DeleteCommentResponseDTO(true, "Comment deleted successfully");
    }

    private GetCommentsResponseDTO convertToGetDTO(Comment comment) {
        GetCommentsResponseDTO dto = new GetCommentsResponseDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());
        dto.setUserId(comment.getUser().getId());
        dto.setUserName(comment.getUser().getName());
        dto.setArticleId(comment.getArticle().getId());
        return dto;
    }

    private CreateCommentResponseDTO convertToCreateDTO(Comment comment) {
        CreateCommentResponseDTO dto = new CreateCommentResponseDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUserId(comment.getUser().getId());
        dto.setUserName(comment.getUser().getName());
        dto.setArticleId(comment.getArticle().getId());
        return dto;
    }
} 