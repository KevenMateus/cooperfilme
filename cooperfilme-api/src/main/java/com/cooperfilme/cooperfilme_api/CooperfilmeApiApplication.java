package com.cooperfilme.cooperfilme_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.cooperfilme")
public class CooperfilmeApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(CooperfilmeApiApplication.class, args);
    }
}
