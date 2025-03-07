package com.openclassrooms.mddapi.filters;

import com.openclassrooms.mddapi.providers.JwtProvider;
import com.openclassrooms.mddapi.services.CookieService;
import com.openclassrooms.mddapi.services.MyUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final MyUserDetailsService myUserDetailsService;
    private final CookieService cookieService;

    public JwtAuthenticationFilter(JwtProvider jwtProvider, MyUserDetailsService myUserDetailsService, CookieService cookieService) {
        this.jwtProvider = jwtProvider;
        this.myUserDetailsService = myUserDetailsService;
        this.cookieService = cookieService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = cookieService.getJwtFromCookies(request);

        if (token != null && jwtProvider.validateToken(token)) {
            String username = jwtProvider.getUsernameFromToken(token);
            log.debug("Extracted username from token: {}", username);

            UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);
            log.debug("Loaded user details: {}", userDetails);

            if (userDetails != null) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                log.debug("Security context updated with authentication: {}", authenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
