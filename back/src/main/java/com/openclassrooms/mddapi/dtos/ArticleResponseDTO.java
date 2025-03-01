package com.openclassrooms.mddapi.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ArticleResponseDTO {
    private Integer id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserResponseDTO author;
} 