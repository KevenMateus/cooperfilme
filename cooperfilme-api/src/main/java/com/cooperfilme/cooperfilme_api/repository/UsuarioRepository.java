package com.cooperfilme.cooperfilme_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooperfilme.cooperfilme_api.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

     Long countByCargo(String cargo);
}
