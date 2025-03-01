package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.GetThemesResponseDTO;
import com.openclassrooms.mddapi.services.ThemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Themes", description = "Endpoints for managing themes")
@RestController
@RequestMapping("themes")
@RequiredArgsConstructor
@Slf4j
public class ThemeController {

    private final ThemeService themeService;

    @Operation(summary = "Get all themes", description = "Returns a list of all available themes")
    @ApiResponse(responseCode = "200", description = "List of themes retrieved successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = GetThemesResponseDTO.class)))
    @GetMapping
    public ResponseEntity<List<GetThemesResponseDTO>> getAllThemes() {
        return ResponseEntity.ok(themeService.getAllThemes());
    }
} 