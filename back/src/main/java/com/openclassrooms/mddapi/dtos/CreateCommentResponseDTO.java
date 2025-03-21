package com.openclassrooms.mddapi.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateCommentResponseDTO {
    private Integer id;
    private String content;
    private LocalDateTime createdAt;
    private Integer userId;
    private String userName;
    private Integer articleId;
} 