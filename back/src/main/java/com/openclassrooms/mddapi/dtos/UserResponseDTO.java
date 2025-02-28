package com.openclassrooms.mddapi.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponseDTO {
    private Integer id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
