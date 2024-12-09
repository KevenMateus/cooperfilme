package com.cooperfilme.cooperfilme_api.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooperfilme.cooperfilme_api.model.Roteiro;
import com.cooperfilme.cooperfilme_api.model.StatusRoteiro;
import com.cooperfilme.cooperfilme_api.model.TipoVoto;
import com.cooperfilme.cooperfilme_api.model.Usuario;
import com.cooperfilme.cooperfilme_api.model.Voto;
import com.cooperfilme.cooperfilme_api.repository.VotoRepository;

@Service
public class VotoService {

    @Autowired
    private VotoRepository votoRepository;

    @Autowired
    private RoteiroService roteiroService;

    @Autowired
    private UsuarioService usuarioService;

    public void registrarVoto(Long roteiroId, Long usuarioId, TipoVoto voto) {
        Roteiro roteiro = roteiroService.getRoteiro(roteiroId)
                .orElseThrow(() -> new IllegalArgumentException("Roteiro não encontrado."));

        Usuario usuario = usuarioService.getUsuario(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        if (!usuario.getCargo().equals("APROVADOR")) {
            throw new IllegalArgumentException("Apenas Aprovadores podem votar.");
        }

        Voto novoVoto = new Voto();
        novoVoto.setRoteiro(roteiro);
        novoVoto.setUsuario(usuario);
        novoVoto.setVoto(voto);
        novoVoto.setDataVoto(LocalDateTime.now());
        votoRepository.save(novoVoto);

        processarVotos(roteiro);
    }

    public boolean usuarioJaVotou(Long roteiroId, Long usuarioId) {
        return votoRepository.existsByRoteiroIdAndUsuarioId(roteiroId, usuarioId);
    }

    private void processarVotos(Roteiro roteiro) {
        long votosAprovar = votoRepository.countByRoteiroIdAndVoto(roteiro.getId(), TipoVoto.APROVAR);
        long votosRecusar = votoRepository.countByRoteiroIdAndVoto(roteiro.getId(), TipoVoto.RECUSAR);
        long totalAnalistas;
        totalAnalistas = usuarioService.countByCargo("APROVADOR");

        if (votosRecusar > 0) {
            roteiro.setStatus(StatusRoteiro.RECUSADO.getId());
        } else if (votosAprovar == totalAnalistas) {
            roteiro.setStatus(StatusRoteiro.APROVADO.getId());
        } else if (votosAprovar >= 1) {
            roteiro.setStatus(StatusRoteiro.EM_APROVACAO.getId());
        }

        roteiroService.atualizarRoteiro(roteiro);
    }
}
