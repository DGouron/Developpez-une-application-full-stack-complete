package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.ArticleRequestDTO;
import com.openclassrooms.mddapi.dtos.ArticleResponseDTO;
import com.openclassrooms.mddapi.services.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "Articles", description = "Endpoints for managing articles")
@RestController
@RequestMapping("articles")
@RequiredArgsConstructor
@Slf4j
public class ArticleController {

    private final ArticleService articleService;

    @Operation(summary = "Get all articles", description = "Returns a list of all articles")
    @ApiResponse(responseCode = "200", description = "List of articles",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ArticleResponseDTO.class)))
    @GetMapping
    public ResponseEntity<List<ArticleResponseDTO>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @Operation(summary = "Get article by ID", description = "Returns an article by its ID")
    @ApiResponse(responseCode = "200", description = "Article found",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ArticleResponseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Article not found")
    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDTO> getArticleById(@PathVariable Integer id) {
        Optional<ArticleResponseDTO> article = articleService.getArticleById(id);
        return article.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Get articles by author", description = "Returns a list of articles by the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "List of articles by author",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ArticleResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @GetMapping("/my-articles")
    public ResponseEntity<List<ArticleResponseDTO>> getMyArticles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        return ResponseEntity.ok(articleService.getArticlesByAuthor(currentUserEmail));
    }

    @Operation(summary = "Create a new article", description = "Creates a new article for the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "201", description = "Article created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ArticleResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Bad request, invalid data")
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @PostMapping
    public ResponseEntity<ArticleResponseDTO> createArticle(@RequestBody ArticleRequestDTO articleRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        ArticleResponseDTO createdArticle = articleService.createArticle(articleRequestDTO, currentUserEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }

    @Operation(summary = "Update an article", description = "Updates an existing article for the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "Article updated successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ArticleResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Bad request, invalid data")
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @ApiResponse(responseCode = "403", description = "Forbidden, user not authorized to update this article")
    @ApiResponse(responseCode = "404", description = "Article not found")
    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponseDTO> updateArticle(
            @PathVariable Integer id,
            @RequestBody ArticleRequestDTO articleRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        Optional<ArticleResponseDTO> updatedArticle = articleService.updateArticle(id, articleRequestDTO, currentUserEmail);
        return updatedArticle.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete an article", description = "Deletes an existing article for the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "204", description = "Article deleted successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @ApiResponse(responseCode = "403", description = "Forbidden, user not authorized to delete this article")
    @ApiResponse(responseCode = "404", description = "Article not found")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        boolean deleted = articleService.deleteArticle(id, currentUserEmail);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 