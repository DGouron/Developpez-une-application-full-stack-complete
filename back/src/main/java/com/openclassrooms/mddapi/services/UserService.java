package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.providers.JwtProvider;
import com.openclassrooms.mddapi.dtos.AuthRequestDTO;
import com.openclassrooms.mddapi.dtos.ProfileRequestDTO;
import com.openclassrooms.mddapi.dtos.UserResponseDTO;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.utils.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Autowired
    private final JwtProvider JwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    public User saveUser(User user) {
        User userToSave = User.builder()
                .name(user.getName())
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .isEnabled(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .isAccountNonExpired(true)
                .build();
        return userRepository.save(userToSave);
    }

    public UserResponseDTO updateProfile(String email, ProfileRequestDTO profileRequest) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new BadCredentialsException("User not found");
        }

        user.setName(profileRequest.getUsername());
        user.setEmail(profileRequest.getEmail());
        
        if (profileRequest.getPassword() != null && !profileRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(profileRequest.getPassword()));
        }
        
        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponseDTO(updatedUser);
    }

       /**
     * Génère un token JWT pour un utilisateur donné
     * @param user L'utilisateur pour lequel générer le token
     * @return Le token JWT généré
     */
    public String generateTokenForUser(User user) {
        return JwtProvider.generateJwtToken(user.getEmail());
    }

    public String authenticate(AuthRequestDTO authRequest) {
        try {
            // Chercher l'utilisateur par email
            User user = userRepository.findByEmail(authRequest.getEmail());
            if (user == null) {
                throw new BadCredentialsException("User not found");
            }

            // Vérification du mot de passe
            if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                throw new BadCredentialsException("Incorrect password");
            }

            // Authentification réussie
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            // Récupérer les détails de l'utilisateur et générer un token
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = JwtProvider.generateJwtToken(userDetails.getUsername());
            return token;

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(e.getMessage());
        }
    }
}
