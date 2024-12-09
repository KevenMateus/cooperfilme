package com.cooperfilme.cooperfilme_api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Roteiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String texto;
    private Integer status;
    private LocalDateTime dataEnvio;
    private String justificativa;
    private String observacao;
    private String clienteNome;
    private String clienteEmail;
    private String clienteTelefone;

    public Roteiro() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public String getNomeCliente() {
        return clienteNome;
    }

    public void setNomeCliente(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public String getEmailCliente() {
        return clienteEmail;
    }
    
    public void setEmailCliente(String clienteEmail) {
        this.clienteEmail = clienteEmail;
    }


    public String getTelefoneCliente() {
        return clienteTelefone;
    }

    public void setTelefoneCliente(String clienteTelefone) {
        this.clienteTelefone = clienteTelefone;
    }


    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }

    public void setDataEnvio(LocalDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    @ManyToOne
    @JoinColumn(name = "responsavel_id")
    private Usuario responsavel;

    public Usuario getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Usuario responsavel) {
        this.responsavel = responsavel;
    }
}
