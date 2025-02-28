package com.openclassrooms.mddapi.utils;

import com.openclassrooms.mddapi.dtos.AuthRequestDTO;
import com.openclassrooms.mddapi.entities.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public User toUser(AuthRequestDTO authRequestDTO) {
        User user = new User();
        user.setEmail(authRequestDTO.getEmail());
        user.setPassword(authRequestDTO.getPassword());
        user.setName(authRequestDTO.getName());
        return user;
    }
}
