package com.cooperfilme.cooperfilme_api.dto;

public class AlterarStatusRoteiroDTO {
    private Integer novoStatus;
    private String observacao;
    private String justificativa;

    public Integer getNovoStatus() {
        return novoStatus;
    }

    public void setNovoStatus(Integer novoStatus) {
        this.novoStatus = novoStatus;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }
}
