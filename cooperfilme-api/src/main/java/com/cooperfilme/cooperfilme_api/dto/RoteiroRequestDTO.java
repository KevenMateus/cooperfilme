package com.cooperfilme.cooperfilme_api.dto;

import com.cooperfilme.cooperfilme_api.model.Cliente;

public class RoteiroRequestDTO {
    private String textoRoteiro;
    private Cliente cliente;

    public String getTextoRoteiro() {
        return textoRoteiro;
    }

    public void setTextoRoteiro(String textoRoteiro) {
        this.textoRoteiro = textoRoteiro;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
