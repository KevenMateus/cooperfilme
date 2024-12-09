package com.cooperfilme.cooperfilme_api.model;

public enum StatusRoteiro {
    AGUARDANDO_ANALISE(1),
    EM_ANALISE(2),
    AGUARDANDO_REVISAO(3),
    EM_REVISAO(4),
    AGUARDANDO_APROVACAO(5),
    EM_APROVACAO(6),
    APROVADO(7), 
    RECUSADO(8);   

    private final int id;

    StatusRoteiro(int id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public static StatusRoteiro fromId(Integer id) {
        for (StatusRoteiro status : StatusRoteiro.values()) {
            if (status.id == id) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status inválido: " + id);
    }

    public int getValor() {
        return id;
    }

    public static StatusRoteiro fromString(String status) {
        for (StatusRoteiro s : StatusRoteiro.values()) {
            if (s.name().equalsIgnoreCase(status)) {
                return s;
            }
        }
        return null;
    }
}