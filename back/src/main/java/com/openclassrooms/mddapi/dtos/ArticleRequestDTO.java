package com.openclassrooms.mddapi.dtos;

import lombok.Data;

@Data
public class ArticleRequestDTO {
    private String title;
    private String content;
    private Integer themeId;
} 