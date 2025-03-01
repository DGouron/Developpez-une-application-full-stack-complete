package com.openclassrooms.mddapi.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetCommentsResponseDTO {
    private Integer id;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer userId;
    private String userName;
    private Integer articleId;
} 