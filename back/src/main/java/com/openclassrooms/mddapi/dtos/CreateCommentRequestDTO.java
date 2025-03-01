package com.openclassrooms.mddapi.dtos;

import lombok.Data;

@Data
public class CreateCommentRequestDTO {
    private String content;
    private Integer articleId;
} 