package com.cooperfilme.cooperfilme_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cooperfilme.cooperfilme_api.JwtTokenUtil;
import com.cooperfilme.cooperfilme_api.model.Usuario;
import com.cooperfilme.cooperfilme_api.repository.UsuarioRepository;

@Service
public class AuthService {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public String authenticate(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (encoder.matches(password, usuario.getSenha())) {
            return jwtTokenUtil.generateToken(email, usuario.getId(), usuario.getNome(), usuario.getCargo());
        } else {
            throw new RuntimeException("Senha incorreta");
        }
    }
}
