package com.dhruv.library.ticketbooking.security;

import io.jsonwebtoken.*;
        import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Service
public class JwtService {

    private final String issuer;
    private final int expMinutes;
    private final Key key;

    public JwtService(
            @Value("${app.jwt.issuer}") String issuer,
            @Value("${app.jwt.expMinutes}") int expMinutes,
            @Value("${app.jwt.secret}") String secret
    ) {
        this.issuer = issuer;
        this.expMinutes = expMinutes;
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, String role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expMinutes * 60L * 1000L);

        return Jwts.builder()
                .setIssuer(issuer)
                .setSubject(username)
                .claim("roles", List.of(role))
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> parseAndValidate(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .requireIssuer(issuer)
                .build()
                .parseClaimsJws(token);
    }
}
