package com.dhruv.library.service.security;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;


import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
@Component
public class JwtService {
    private static final String ISSUER = "library-v2";
    private static final long EXPIRATION_SECONDS = 3600;

    private final Key key;

    public JwtService(@Value("${security.jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }


    public String generateToken(String username, List<String> roles) {
        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plusSeconds(EXPIRATION_SECONDS)))
                .signWith(key)
                .compact();
    }

    public Jws<Claims> parseAndValidate(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .requireIssuer(ISSUER)
                .build()
                .parseSignedClaims(token);
    }
}
