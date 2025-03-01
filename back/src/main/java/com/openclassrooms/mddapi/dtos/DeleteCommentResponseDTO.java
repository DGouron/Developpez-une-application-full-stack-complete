package com.openclassrooms.mddapi.dtos;

import lombok.Data;

@Data
public class DeleteCommentResponseDTO {
    private boolean success;
    private String message;
    
    public DeleteCommentResponseDTO(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
} 