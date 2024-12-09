package com.cooperfilme.cooperfilme_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooperfilme.cooperfilme_api.model.TipoVoto;
import com.cooperfilme.cooperfilme_api.model.Voto;

@Repository
public interface VotoRepository extends JpaRepository<Voto, Long> {
    List<Voto> findByRoteiroId(Long roteiroId);

    long countByRoteiroIdAndVoto(Long roteiroId, TipoVoto voto);

    boolean existsByRoteiroIdAndUsuarioId(Long roteiroId, Long usuarioId);
}
