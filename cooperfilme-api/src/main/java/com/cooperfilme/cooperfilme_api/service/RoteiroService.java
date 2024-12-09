package com.cooperfilme.cooperfilme_api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.cooperfilme.cooperfilme_api.dto.AlterarStatusRoteiroDTO;
import com.cooperfilme.cooperfilme_api.model.Cliente;
import com.cooperfilme.cooperfilme_api.model.Roteiro;
import com.cooperfilme.cooperfilme_api.model.StatusRoteiro;
import com.cooperfilme.cooperfilme_api.model.Usuario;
import com.cooperfilme.cooperfilme_api.repository.RoteiroRepository;
import com.cooperfilme.cooperfilme_api.specification.RoteiroSpecification;

@Service
public class RoteiroService {

    @Autowired
    private final RoteiroRepository roteiroRepository;
    private final UsuarioService usuarioService;

    public RoteiroService(RoteiroRepository roteiroRepository, UsuarioService usuarioService) {
        this.roteiroRepository = roteiroRepository;
        this.usuarioService = usuarioService;
    }

    public Roteiro enviarRoteiro(String textoRoteiro, Cliente clienteDados) {
        if (clienteDados.getNome() == null || clienteDados.getNome().isEmpty()) {
            throw new IllegalArgumentException("O nome do cliente não pode ser nulo ou vazio");
        }
        if (clienteDados.getEmail() == null || clienteDados.getEmail().isEmpty()) {
            throw new IllegalArgumentException("O email do cliente não pode ser nulo ou vazio");
        }
        if (clienteDados.getTelefone() == null || clienteDados.getTelefone().isEmpty()) {
            throw new IllegalArgumentException("O telefone do cliente não pode ser nulo ou vazio");
        }

        Roteiro roteiro = new Roteiro();
        roteiro.setTexto(textoRoteiro);
        roteiro.setDataEnvio(LocalDateTime.now());
        roteiro.setNomeCliente(clienteDados.getNome());
        roteiro.setEmailCliente(clienteDados.getEmail());
        roteiro.setTelefoneCliente(clienteDados.getTelefone());
        roteiro.setStatus(StatusRoteiro.AGUARDANDO_ANALISE.getId());

        return roteiroRepository.save(roteiro);
    }

    public Roteiro alterarStatus(Long roteiroId, Long usuarioId, AlterarStatusRoteiroDTO alterarStatusRoteiroDTO) {

        Roteiro roteiro = roteiroRepository.findById(roteiroId)
                .orElseThrow(() -> new RuntimeException("Roteiro não encontrado"));

        Usuario usuario = usuarioService.getUsuario(usuarioId)
                .orElseThrow(() -> new RuntimeException("Roteiro não encontrado"));

        StatusRoteiro novoStatus = StatusRoteiro.fromId(alterarStatusRoteiroDTO.getNovoStatus());
        if (!validarTransicaoDeStatus(roteiro.getStatus(), alterarStatusRoteiroDTO.getNovoStatus())) {
            throw new RuntimeException("Transição de status inválida");
        }

        if (!usuarioTemPermissaoParaAlterarStatus(usuario, novoStatus)) {
            throw new RuntimeException("Usuário não tem permissão para alterar para este status");
        }
        if (alterarStatusRoteiroDTO.getNovoStatus().equals(StatusRoteiro.EM_REVISAO.getId())) {
            String observacao = alterarStatusRoteiroDTO.getObservacao();
            if (observacao != null && !observacao.trim().isEmpty()) {
                roteiro.setObservacao(observacao);
            }
        } else if (alterarStatusRoteiroDTO.getNovoStatus().equals(StatusRoteiro.RECUSADO.getId())) {
            String justificativa = alterarStatusRoteiroDTO.getJustificativa();
            if (justificativa != null && !justificativa.trim().isEmpty()) {
                roteiro.setJustificativa(justificativa);
            }
        }

        roteiro.setStatus(novoStatus.getId());

        return roteiroRepository.save(roteiro);
    }

    private boolean validarTransicaoDeStatus(int statusAtual, int novoStatus) {
        StatusRoteiro novoStatusEnum = StatusRoteiro.fromId(novoStatus);
        StatusRoteiro statusAtualEnum = StatusRoteiro.fromId(statusAtual);

        return switch (statusAtualEnum) {
            case AGUARDANDO_ANALISE -> novoStatusEnum == StatusRoteiro.EM_ANALISE;
            case EM_ANALISE ->
                novoStatusEnum == StatusRoteiro.AGUARDANDO_REVISAO || novoStatusEnum == StatusRoteiro.RECUSADO;
            case AGUARDANDO_REVISAO -> novoStatusEnum == StatusRoteiro.EM_REVISAO;
            case EM_REVISAO -> novoStatusEnum == StatusRoteiro.AGUARDANDO_APROVACAO;
            case AGUARDANDO_APROVACAO ->
                novoStatusEnum == StatusRoteiro.EM_APROVACAO || novoStatusEnum == StatusRoteiro.RECUSADO;
            case EM_APROVACAO -> novoStatusEnum == StatusRoteiro.APROVADO || novoStatusEnum == StatusRoteiro.RECUSADO;
            case APROVADO -> false;
            case RECUSADO -> false;
            default -> false;
        };
    }

    private boolean usuarioTemPermissaoParaAlterarStatus(Usuario usuario, StatusRoteiro novoStatus) {
        return switch (novoStatus) {
            case AGUARDANDO_ANALISE -> usuario.getCargo().equalsIgnoreCase("Analista");
            case EM_ANALISE -> usuario.getCargo().equalsIgnoreCase("Analista");
            case AGUARDANDO_REVISAO -> usuario.getCargo().equalsIgnoreCase("Analista");
            case EM_REVISAO -> usuario.getCargo().equalsIgnoreCase("Revisor");
            case AGUARDANDO_APROVACAO -> usuario.getCargo().equalsIgnoreCase("Revisor");
            case RECUSADO -> usuario.getCargo().equalsIgnoreCase("Analista");
            case EM_APROVACAO -> usuario.getCargo().equalsIgnoreCase("Aprovador");
            case APROVADO -> usuario.getCargo().equalsIgnoreCase("Aprovador");
            default -> false;
        };
    }

    public List<Roteiro> consultarStatusPorEmailCliente(String clienteEmail) {
        return roteiroRepository.findByClienteEmail(clienteEmail);
    }

    public Optional<Roteiro> getRoteiro(Long id) {
        return roteiroRepository.findById(id);
    }

    public List<Roteiro> consultarRoteiros(String clienteNome, LocalDateTime dataInicio, LocalDateTime dataFim,
            Integer status) {
        Specification<Roteiro> spec = new RoteiroSpecification(clienteNome, dataInicio, dataFim, status);
        return roteiroRepository.findAll(spec);
    }

    void atualizarRoteiro(Roteiro roteiro) {
        roteiroRepository.save(roteiro);
    }
}
