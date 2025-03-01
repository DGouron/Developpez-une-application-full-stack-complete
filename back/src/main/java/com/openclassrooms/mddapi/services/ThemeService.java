package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.GetThemesResponseDTO;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.repositories.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;

    public List<GetThemesResponseDTO> getAllThemes() {
        List<Theme> themes = new ArrayList<>();
        themeRepository.findAllByOrderByTitleAsc().forEach(themes::add);
        return themes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private GetThemesResponseDTO convertToDTO(Theme theme) {
        GetThemesResponseDTO dto = new GetThemesResponseDTO();
        dto.setId(theme.getId());
        dto.setTitle(theme.getTitle());
        dto.setDescription(theme.getDescription());
        dto.setCreatedAt(theme.getCreatedAt());
        dto.setUpdatedAt(theme.getUpdatedAt());
        return dto;
    }
} 