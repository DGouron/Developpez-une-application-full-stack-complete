package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.CreateSubscriptionRequestDTO;
import com.openclassrooms.mddapi.dtos.CreateSubscriptionResponseDTO;
import com.openclassrooms.mddapi.dtos.GetSubscriptionsResponseDTO;
import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.SubscriptionRepository;
import com.openclassrooms.mddapi.repositories.ThemeRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;

    public List<GetSubscriptionsResponseDTO> getUserSubscriptions(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            return new ArrayList<>();
        }
        
        List<Subscription> subscriptions = subscriptionRepository.findByUser(user);
        return subscriptions.stream()
                .map(this::convertToGetDTO)
                .collect(Collectors.toList());
    }

    public CreateSubscriptionResponseDTO createSubscription(CreateSubscriptionRequestDTO requestDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        Optional<Theme> themeOptional = themeRepository.findById(requestDTO.getThemeId());
        if (themeOptional.isEmpty()) {
            throw new IllegalArgumentException("Theme not found");
        }
        
        Theme theme = themeOptional.get();
        
        // Check if subscription already exists
        if (subscriptionRepository.existsByUserAndTheme(user, theme)) {
            throw new IllegalArgumentException("Subscription already exists");
        }

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setTheme(theme);

        Subscription savedSubscription = subscriptionRepository.save(subscription);
        return convertToCreateDTO(savedSubscription);
    }

    public boolean deleteSubscription(Integer id, String userEmail) {
        Optional<Subscription> subscriptionOptional = subscriptionRepository.findById(id);
        if (subscriptionOptional.isEmpty()) {
            return false;
        }

        Subscription subscription = subscriptionOptional.get();
        User user = userRepository.findByEmail(userEmail);
        
        if (user == null || !subscription.getUser().getId().equals(user.getId())) {
            return false;
        }

        subscriptionRepository.delete(subscription);
        return true;
    }

    private GetSubscriptionsResponseDTO convertToGetDTO(Subscription subscription) {
        GetSubscriptionsResponseDTO dto = new GetSubscriptionsResponseDTO();
        dto.setId(subscription.getId());
        dto.setThemeId(subscription.getTheme().getId());
        dto.setThemeTitle(subscription.getTheme().getTitle());
        dto.setThemeDescription(subscription.getTheme().getDescription());
        dto.setCreatedAt(subscription.getCreatedAt());
        dto.setUpdatedAt(subscription.getUpdatedAt());
        return dto;
    }

    private CreateSubscriptionResponseDTO convertToCreateDTO(Subscription subscription) {
        CreateSubscriptionResponseDTO dto = new CreateSubscriptionResponseDTO();
        dto.setId(subscription.getId());
        dto.setThemeId(subscription.getTheme().getId());
        dto.setThemeTitle(subscription.getTheme().getTitle());
        dto.setThemeDescription(subscription.getTheme().getDescription());
        dto.setCreatedAt(subscription.getCreatedAt());
        return dto;
    }
} 