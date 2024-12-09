package com.cooperfilme.cooperfilme_api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooperfilme.cooperfilme_api.JwtTokenUtil;
import com.cooperfilme.cooperfilme_api.dto.login.LoginRequestDto;
import com.cooperfilme.cooperfilme_api.dto.login.LoginResponseDto;
import com.cooperfilme.cooperfilme_api.model.Usuario;
import com.cooperfilme.cooperfilme_api.service.UsuarioService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping()
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(loginRequest.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
        Usuario usuario = usuarioOpt.get();
        if (!passwordEncoder.matches(loginRequest.getSenha(), usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Senha incorreta");
        }
        String token = jwtTokenUtil.generateToken(usuario.getEmail(), usuario.getId(), usuario.getNome(), usuario.getCargo());

        return ResponseEntity.ok(new LoginResponseDto(token));
    }
}
