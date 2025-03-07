package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.AuthRequestDTO;
import com.openclassrooms.mddapi.dtos.AuthResponseDTO;
import com.openclassrooms.mddapi.dtos.ProfileRequestDTO;
import com.openclassrooms.mddapi.dtos.UserResponseDTO;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.services.CookieService;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.utils.AuthMapper;
import com.openclassrooms.mddapi.utils.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Authentication", description = "Endpoints for user authentication and registration")
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final AuthMapper authMapper;
    private final UserMapper userMapper;
    private final CookieService cookieService;

    @Operation(summary = "Get authenticated user", description = "Returns the details of the authenticated user", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "Authenticated user details",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getProfile() {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userMail);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        UserResponseDTO userResponseDTO = userMapper.toUserResponseDTO(user);
        return ResponseEntity.ok(userResponseDTO);
    }

    @Operation(summary = "Update user profile", description = "Updates the profile of the authenticated user", security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "Profile updated successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Bad request, invalid data")
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @PostMapping("/profile")
    public ResponseEntity<UserResponseDTO> updateProfile(@Valid @RequestBody ProfileRequestDTO profileRequest) {
        try {
            String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
            UserResponseDTO updatedUser = userService.updateProfile(userMail, profileRequest);
            return ResponseEntity.ok(updatedUser);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Operation(summary = "Login user", description = "Authenticates the user and returns a JWT token")
    @ApiResponse(responseCode = "200", description = "User authenticated successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Invalid username or password",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class)))
    @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class)))
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequest) {
        try {
            String jwt = userService.authenticate(authRequest);
            System.out.println(jwt);
            if (jwt == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponseDTO("Échec de l'authentification, utilisateur ou mot de passe incorrect"));
            }

            AuthResponseDTO authSuccess = new AuthResponseDTO(jwt);
            return ResponseEntity.ok(authSuccess);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponseDTO("Erreur serveur lors de l'authentification"));
        }
    }

    @Operation(summary = "Register a new user", description = "Registers a new user and returns a success message")
    @ApiResponse(responseCode = "201", description = "User registered successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Bad request, invalid data",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class)))
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody AuthRequestDTO authRequestDTO, HttpServletResponse response) {
        User user = authMapper.toUser(authRequestDTO);
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        User savedUser = userService.saveUser(user);

        String jwt = userService.generateTokenForUser(savedUser);

        cookieService.createJwtCookie(response, jwt);
        
        UserResponseDTO userResponseDTO = userMapper.toUserResponseDTO(savedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDTO);
    }
    
    @Operation(summary = "Logout user", description = "Clears the authentication cookie")
    @ApiResponse(responseCode = "200", description = "User logged out successfully")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        cookieService.clearJwtCookie(response);
        return ResponseEntity.ok().build();
    }
}
