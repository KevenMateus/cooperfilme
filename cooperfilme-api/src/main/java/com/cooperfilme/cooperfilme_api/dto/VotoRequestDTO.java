package com.cooperfilme.cooperfilme_api.dto;

import com.cooperfilme.cooperfilme_api.model.TipoVoto;

public class VotoRequestDTO {

    private Long usuarioId;
    private TipoVoto voto;

    public VotoRequestDTO() {

    }

    public VotoRequestDTO(Long usuarioId, TipoVoto voto) {
        this.usuarioId = usuarioId;
        this.voto = voto;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public TipoVoto getVoto() {
        return voto;
    }

    public void setVoto(TipoVoto voto) {
        this.voto = voto;
    }

    @Override
    public String toString() {
        return "VotoRequestDto{" +
                "usuarioId=" + usuarioId +
                ", voto=" + voto +
                '}';
    }
}
