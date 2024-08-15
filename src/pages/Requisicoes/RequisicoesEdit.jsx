import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarRequisicao } from './Requisicoes';
import { Button } from '../../components';
import { listarFornecedores } from '../Fornecedores/fornecedores';
import { listarCotacoes } from '../Cotacoes/Cotacoes';

function RequisicoesEdit({ requisicao, onClose, onRequisicaoUpdated }) {
  const [fornecedores, setFornecedores] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(requisicao);
  }, [requisicao, reset]);

  async function onSubmit(dados) {
    await atualizarRequisicao(requisicao.id, dados);
    onRequisicaoUpdated();
    onClose();
  }

  useEffect(() => {
    async function fetchFornecedores() {
      const fornecedoresList = await listarFornecedores();
      setFornecedores(fornecedoresList);
    }
    fetchFornecedores();
  }, []);

  useEffect(() => {
    async function fetchCotacoes() {
      const cotacoesList = await listarCotacoes();
      setCotacoes(cotacoesList);
    }
    fetchCotacoes();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-Editform">
        Status da requisição
        <select
          className="input-Editform"
          {...register('status', {
            required: 'Status da requisição é obrigatório',
          })}
        >
          <option value="">Selecione o status</option>
          <option value="aguardando">Aguardando</option>
          <option value="em andamento">Em Andamento</option>
          <option value="finalizada">Finalizada</option>
        </select>
        {errors.status && (
          <span className="error-message">{errors.status.message}</span>
        )}
      </label>
      <label htmlFor="fornecedor" className="label-Registerform">
        Fornecedor
      </label>
      <select
        id="fornecedor"
        className="input-Registerform"
        {...register('fornecedor', {
          required: 'Selecione um fornecedor',
        })}
      >
        <option value="">Selecione um fornecedor</option>
        {fornecedores.map((fornecedor) => (
          <option key={fornecedor.id} value={fornecedor.nome}>
            {fornecedor.nome}
          </option>
        ))}
      </select>
      {errors.fornecedor && (
        <p className="error-message">{errors.fornecedor.message}</p>
      )}
      <label htmlFor="cotacao" className="label-Registerform">
        Cotações
      </label>
      <select
        id="cotacao"
        className="input-Registerform"
        {...register('cotacao', {
          required: 'Selecione uma cotação',
        })}
      >
        <option value="">Selecione uma cotação</option>
        {cotacoes.map((cotacao) => (
          <option key={cotacao.id} value={cotacao.preco}>
            {`${cotacao.produto} - ${cotacao.preco}`}
          </option>
        ))}
      </select>
      {errors.cotacao && (
        <p className="error-message">{errors.cotacao.message}</p>
      )}
      <Button
        type="submit"
        text="salvar"
        sx={{ marginRight: '10px', marginTop: '10px' }}
      />
      <Button
        type="button"
        color="zinc95"
        onClick={onClose}
        text="cancelar"
        sx={{ marginTop: '10px' }}
      />
    </form>
  );
}
export default RequisicoesEdit;
