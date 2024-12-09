package com.cooperfilme.cooperfilme_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooperfilme.cooperfilme_api.dto.VotoRequestDTO;
import com.cooperfilme.cooperfilme_api.service.VotoService;

@RestController
@RequestMapping("/votos")
@CrossOrigin(origins = "#{@corsProperties.getAllowedOrigin()}")
public class VotoController {

    @Autowired
    private VotoService votoService;

    @PostMapping("/{roteiroId}/votar")
    public ResponseEntity<?> votar(
            @PathVariable Long roteiroId,
            @RequestBody VotoRequestDTO votoRequest) {
        
        if (votoService.usuarioJaVotou(roteiroId, votoRequest.getUsuarioId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário já votou neste roteiro.");
        }
        
        votoService.registrarVoto(roteiroId, votoRequest.getUsuarioId(), votoRequest.getVoto());
        return ResponseEntity.ok("Voto registrado com sucesso.");
    }
    
}
