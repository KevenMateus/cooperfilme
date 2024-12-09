package com.cooperfilme.cooperfilme_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cooperfilme.cooperfilme_api.JwtTokenUtil;
import com.cooperfilme.cooperfilme_api.model.Usuario;
import com.cooperfilme.cooperfilme_api.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final JwtTokenUtil jwtTokenUtil;

    public UsuarioController(UsuarioService usuarioService, JwtTokenUtil jwtTokenUtil) {
        this.usuarioService = usuarioService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario createUsuario(@RequestBody Usuario usuario, @RequestHeader("Authorization") String token) {
        if (!isTokenValid(token)) {
            throw new RuntimeException("Token inválido ou expirado");
        }
        return usuarioService.createUsuario(usuario);
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuario(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        if (!isTokenValid(token)) {
            throw new RuntimeException("Token inválido ou expirado");
        }
        return usuarioService.getUsuario(id);
    }

    @GetMapping
    public List<Usuario> getAllUsuarios(@RequestHeader("Authorization") String token) {
        if (!isTokenValid(token)) {
            throw new RuntimeException("Token inválido ou expirado");
        }
        return usuarioService.getAllUsuarios();
    }

    private boolean isTokenValid(String token) {
        String tokenWithoutBearer = token.substring(7);
        String email = jwtTokenUtil.extractUsername(tokenWithoutBearer);
        return jwtTokenUtil.validateToken(tokenWithoutBearer, email);
    }
}
