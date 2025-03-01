package com.openclassrooms.mddapi.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetThemesResponseDTO {
    private Integer id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 