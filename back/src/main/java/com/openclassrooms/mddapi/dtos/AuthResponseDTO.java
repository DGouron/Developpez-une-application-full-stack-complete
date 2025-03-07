package com.openclassrooms.mddapi.dtos;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String token;
    private String message;

    public AuthResponseDTO(String token) {
        this.token = token;
    }

    public AuthResponseDTO(String message, boolean isError) {
        this.message = message;
    }
}
