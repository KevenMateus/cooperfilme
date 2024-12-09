package com.cooperfilme.cooperfilme_api;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenUtil {

    @SuppressWarnings("deprecation")
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @SuppressWarnings("deprecation")
    public String generateToken(String email, Long idUsuario, String nome, String cargo) {
        return Jwts.builder()
                .setSubject(email)
                .claim("usuarioId", idUsuario)
                .claim("nome", nome)
                .claim("cargo", cargo)     
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SECRET_KEY)
                .compact();
    }

    public Long getUsuarioIdFromToken(String token) {
        try {
            @SuppressWarnings("deprecation")
            JwtParser parser = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build();
    
            @SuppressWarnings("deprecation")
            Claims claims = parser.parseClaimsJws(token.replace("Bearer ", ""))
                .getBody();
    
            return claims.get("usuarioId", Long.class);
        } catch (@SuppressWarnings("deprecation") SignatureException e) {
            throw new RuntimeException("Token inválido ou expirado", e);
        }
    }

    public boolean validateToken(String token, String email) {
        String tokenEmail = extractUsername(token);
        Boolean tokenIsExpired = isTokenExpired(token);
        return (email.equals(tokenEmail) && tokenIsExpired == false);
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    @SuppressWarnings("deprecation")
    private Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }
}
