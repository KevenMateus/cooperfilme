package com.cooperfilme.cooperfilme_api.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cooperfilme.cooperfilme_api.JwtTokenUtil;
import com.cooperfilme.cooperfilme_api.dto.AlterarStatusRoteiroDTO;
import com.cooperfilme.cooperfilme_api.dto.RoteiroRequestDTO;
import com.cooperfilme.cooperfilme_api.model.Roteiro;
import com.cooperfilme.cooperfilme_api.service.RoteiroService;

@RestController
@RequestMapping("/roteiros")
@CrossOrigin(origins = "#{@corsProperties.getAllowedOrigin()}")
public class RoteiroController {

    private final RoteiroService roteiroService;
    private final JwtTokenUtil jwtTokenUtil;

    public RoteiroController(RoteiroService roteiroService, JwtTokenUtil jwtTokenUtil) {
        this.roteiroService = roteiroService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/enviar")
    @ResponseStatus(HttpStatus.CREATED)
    public Roteiro enviarRoteiro(@RequestBody RoteiroRequestDTO request) {
        return roteiroService.enviarRoteiro(request.getTextoRoteiro(), request.getCliente());
    }

    @GetMapping("/consultar-status")
    public List<Roteiro> consultarStatusPorEmailCliente(@RequestParam String emailCliente) {
        return roteiroService.consultarStatusPorEmailCliente(emailCliente);
    }

    @PutMapping("/alterar-status/{roteiroId}")
    public Roteiro alterarStatus(@PathVariable Long roteiroId,
            @RequestHeader("Authorization") String token,
            @RequestBody AlterarStatusRoteiroDTO alterarStatusDTO) {
        if (!isTokenValid(token)) {
            throw new RuntimeException("Token inválido ou expirado");
        }

        Long usuarioId = jwtTokenUtil.getUsuarioIdFromToken(token);

        return roteiroService.alterarStatus(roteiroId, usuarioId, alterarStatusDTO);
    }

    @GetMapping("/consultar")
    public List<Roteiro> consultarRoteiros(
            @RequestParam(required = false) String clienteNome,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataFim,
            @RequestParam(required = false) Integer status) {

        return roteiroService.consultarRoteiros(clienteNome, dataInicio, dataFim, status);
    }

    private boolean isTokenValid(String token) {
        String tokenWithoutBearer = token.substring(7);
        String email = jwtTokenUtil.extractUsername(tokenWithoutBearer);
        return jwtTokenUtil.validateToken(tokenWithoutBearer, email);
    }
}
