package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.CreateCommentRequestDTO;
import com.openclassrooms.mddapi.dtos.CreateCommentResponseDTO;
import com.openclassrooms.mddapi.dtos.DeleteCommentResponseDTO;
import com.openclassrooms.mddapi.dtos.GetCommentsResponseDTO;
import com.openclassrooms.mddapi.services.CommentService;
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

@Tag(name = "Comments", description = "Endpoints for managing article comments")
@RestController
@RequestMapping("comments")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "Get comments by article ID", description = "Returns a list of comments for a specific article")
    @ApiResponse(responseCode = "200", description = "List of comments retrieved successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = GetCommentsResponseDTO.class)))
    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<GetCommentsResponseDTO>> getCommentsByArticleId(@PathVariable Integer articleId) {
        return ResponseEntity.ok(commentService.getCommentsByArticleId(articleId));
    }

    @Operation(summary = "Get user comments", description = "Returns a list of comments created by the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "List of user comments retrieved successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = GetCommentsResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @GetMapping("/my-comments")
    public ResponseEntity<List<GetCommentsResponseDTO>> getUserComments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        return ResponseEntity.ok(commentService.getUserComments(currentUserEmail));
    }

    @Operation(summary = "Create a new comment", description = "Creates a new comment for an article by the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "201", description = "Comment created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateCommentResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Bad request, invalid data")
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @ApiResponse(responseCode = "404", description = "Article not found")
    @PostMapping
    public ResponseEntity<CreateCommentResponseDTO> createComment(@RequestBody CreateCommentRequestDTO requestDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserEmail = authentication.getName();
            CreateCommentResponseDTO createdComment = commentService.createComment(requestDTO, currentUserEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().equals("Article not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
    }

    @Operation(summary = "Delete a comment", description = "Deletes an existing comment created by the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "Comment deleted successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DeleteCommentResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @ApiResponse(responseCode = "403", description = "Forbidden, user not authorized to delete this comment")
    @ApiResponse(responseCode = "404", description = "Comment not found")
    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteCommentResponseDTO> deleteComment(@PathVariable Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        DeleteCommentResponseDTO result = commentService.deleteComment(id, currentUserEmail);
        
        if (!result.isSuccess()) {
            if (result.getMessage().equals("Comment not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
            } else if (result.getMessage().equals("You are not authorized to delete this comment")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
            }
        }
        
        return ResponseEntity.ok(result);
    }
} 