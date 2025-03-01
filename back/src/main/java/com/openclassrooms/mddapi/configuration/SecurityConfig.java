package com.openclassrooms.mddapi.configuration;

import com.openclassrooms.mddapi.filters.JwtAuthenticationFilter;
import com.openclassrooms.mddapi.providers.JwtProvider;
import com.openclassrooms.mddapi.services.CookieService;
import com.openclassrooms.mddapi.services.MyUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfig {

    private final MyUserDetailsService myUserDetailsService;
    private final JwtProvider jwtProvider;
    private final CookieService cookieService;

    public SecurityConfig(
            MyUserDetailsService myUserDetailsService, 
            JwtProvider jwtProvider,
            CookieService cookieService) {
        this.myUserDetailsService = myUserDetailsService;
        this.jwtProvider = jwtProvider;
        this.cookieService = cookieService;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS configuration
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/auth/me").authenticated()
                        .requestMatchers("/rentals").authenticated()
                        .requestMatchers("/rentals/**").authenticated()
                        .requestMatchers("/messages").authenticated()
                        .requestMatchers("/themes").permitAll()
                        .requestMatchers("/articles").permitAll()
                        .requestMatchers("/articles/**").permitAll()
                        .requestMatchers("GET", "/subscriptions").permitAll()
                        .requestMatchers("/subscriptions/**").authenticated()
                        .requestMatchers("GET", "/comments/article/**").permitAll()
                        .requestMatchers("/comments/my-comments").authenticated()
                        .requestMatchers("POST", "/comments").authenticated()
                        .requestMatchers("DELETE", "/comments/**").authenticated()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/webjars/**", "/swagger-ui/*", "/v3/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, myUserDetailsService, cookieService),
                        UsernamePasswordAuthenticationFilter.class) // JWT Filter
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless session management
                );

        return http.build();
    }

    // CORS Management for the frontend
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        // Autoriser les origines spécifiques (Angular frontend)
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        
        // Autoriser tous les en-têtes HTTP courants
        corsConfig.setAllowedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type", 
            "Accept", 
            "Origin", 
            "X-Requested-With", 
            "Access-Control-Request-Method", 
            "Access-Control-Request-Headers"
        ));
        
        // Autoriser les méthodes HTTP principales
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // Exposer l'en-tête Authorization pour que le client puisse le lire
        corsConfig.setExposedHeaders(Arrays.asList("Authorization"));
        
        // Autoriser les cookies
        corsConfig.setAllowCredentials(true);
        
        // Durée de mise en cache des résultats pre-flight
        corsConfig.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return source;
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        authenticationManagerBuilder
                .userDetailsService(myUserDetailsService)
                .passwordEncoder(passwordEncoder());

        return authenticationManagerBuilder.build();
    }
}
