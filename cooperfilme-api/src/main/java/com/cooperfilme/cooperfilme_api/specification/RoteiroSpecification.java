package com.cooperfilme.cooperfilme_api.specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.cooperfilme.cooperfilme_api.model.Roteiro;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class RoteiroSpecification implements Specification<Roteiro> {

    private String clienteNome;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private Integer status;

    public RoteiroSpecification(String clienteNome, LocalDateTime dataInicio, LocalDateTime dataFim, Integer status) {
        this.clienteNome = clienteNome;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = status;
    }

    @Override
    public Predicate toPredicate(Root<Roteiro> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        if (clienteNome != null && !clienteNome.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get("clienteNome")), "%" + clienteNome.toLowerCase() + "%"));
        }
        if (dataInicio != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("dataEnvio"), dataInicio));
        }
        if (dataFim != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("dataEnvio"), dataFim));
        }
        if (status != null) {
            predicates.add(cb.equal(root.get("status"), status));
        }

        return cb.and(predicates.toArray(Predicate[]::new));
    }
}
