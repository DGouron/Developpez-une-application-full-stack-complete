package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.CreateSubscriptionRequestDTO;
import com.openclassrooms.mddapi.dtos.CreateSubscriptionResponseDTO;
import com.openclassrooms.mddapi.dtos.GetSubscriptionsResponseDTO;
import com.openclassrooms.mddapi.services.SubscriptionService;
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

@Tag(name = "Subscriptions", description = "Endpoints for managing user subscriptions to themes")
@RestController
@RequestMapping("subscriptions")
@RequiredArgsConstructor
@Slf4j
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Operation(summary = "Get user subscriptions", description = "Returns a list of all subscriptions for the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "List of user subscriptions",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = GetSubscriptionsResponseDTO.class)))
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @GetMapping
    public ResponseEntity<List<GetSubscriptionsResponseDTO>> getUserSubscriptions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        return ResponseEntity.ok(subscriptionService.getUserSubscriptions(currentUserEmail));
    }

    @Operation(summary = "Create a new subscription", description = "Creates a new subscription to a theme for the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "201", description = "Subscription created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateSubscriptionResponseDTO.class)))
    @ApiResponse(responseCode = "400", description = "Bad request, invalid data or subscription already exists")
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @ApiResponse(responseCode = "404", description = "Theme not found")
    @PostMapping
    public ResponseEntity<CreateSubscriptionResponseDTO> createSubscription(@RequestBody CreateSubscriptionRequestDTO requestDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserEmail = authentication.getName();
            CreateSubscriptionResponseDTO createdSubscription = subscriptionService.createSubscription(requestDTO, currentUserEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSubscription);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().equals("Theme not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else if (e.getMessage().equals("Subscription already exists")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
    }

    @Operation(summary = "Delete a subscription", description = "Deletes an existing subscription for the authenticated user",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "204", description = "Subscription deleted successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized, user not authenticated")
    @ApiResponse(responseCode = "403", description = "Forbidden, user not authorized to delete this subscription")
    @ApiResponse(responseCode = "404", description = "Subscription not found")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        boolean deleted = subscriptionService.deleteSubscription(id, currentUserEmail);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 