package com.openclassrooms.mddapi.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateSubscriptionResponseDTO {
    private Integer id;
    private Integer themeId;
    private String themeTitle;
    private String themeDescription;
    private LocalDateTime createdAt;
} 