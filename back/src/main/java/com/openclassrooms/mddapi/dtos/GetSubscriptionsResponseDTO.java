package com.openclassrooms.mddapi.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetSubscriptionsResponseDTO {
    private Integer id;
    private Integer themeId;
    private String themeTitle;
    private String themeDescription;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 