package com.openclassrooms.mddapi.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    private static final String JWT_COOKIE_NAME = "auth_token";
    private static final int COOKIE_MAX_AGE = 86400; // 24 heures en secondes

    @Value("${app.cookie.domain:localhost}")
    private String cookieDomain;

    @Value("${app.cookie.secure:false}")
    private boolean secure;

    /**
     * Crée un cookie HTTP-only contenant le token JWT
     * @param response L'objet HttpServletResponse pour y ajouter le cookie
     * @param token Le token JWT à stocker dans le cookie
     */
    public void createJwtCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(JWT_COOKIE_NAME, token);
        cookie.setMaxAge(COOKIE_MAX_AGE);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setDomain(cookieDomain);
        cookie.setSecure(secure); // true en production avec HTTPS
        response.addCookie(cookie);
    }

    /**
     * Supprime le cookie JWT en créant un cookie expiré
     * @param response L'objet HttpServletResponse pour y ajouter le cookie expiré
     */
    public void clearJwtCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(JWT_COOKIE_NAME, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setDomain(cookieDomain);
        cookie.setSecure(secure);
        response.addCookie(cookie);
    }

    /**
     * Récupère le token JWT depuis le cookie
     * @param request L'objet HttpServletRequest contenant les cookies
     * @return Le token JWT ou null si non trouvé
     */
    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (JWT_COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
} 