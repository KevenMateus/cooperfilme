package com.cooperfilme.cooperfilme_api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.cooperfilme.cooperfilme_api.model.Roteiro;

public interface RoteiroRepository extends JpaRepository<Roteiro, Long>, JpaSpecificationExecutor<Roteiro> {
    @SuppressWarnings("null")
    @Override
    Optional<Roteiro> findById(Long id);

    List<Roteiro> findByClienteEmail(String clienteEmail);
}