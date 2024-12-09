package com.cooperfilme.cooperfilme_api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CorsProperties {
    @Value("${ALLOWED_ORIGIN}")
    private String allowedOrigin;

    public String getAllowedOrigin() {
        return allowedOrigin;
    }
}
