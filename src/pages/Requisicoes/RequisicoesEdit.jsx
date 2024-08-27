import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarRequisicao } from './Requisicoes';
import { Button } from '../../components';
import { listarCotacoes } from '../Cotacoes/Cotacoes';
import CotacoesForm from '../Cotacoes/CotacoesForm';

function RequisicoesEdit({ requisicao, onClose, onRequisicaoUpdated }) {
  const [cotacoes, setCotacoes] = useState([]);
  const [numeroCotacoes, setNumeroCotacoes] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(requisicao);
  }, [requisicao, reset]);

  async function fetchCotacoes() {
    const cotacoesList = await listarCotacoes();
    const filteredCotacoes = cotacoesList.filter(
      (cotacao) => cotacao.produto === requisicao.produto,
    );
    setNumeroCotacoes(filteredCotacoes.length);
    setCotacoes(filteredCotacoes);
  }

  useEffect(() => {
    fetchCotacoes();
  }, [requisicao.produto]);

  async function onSubmit(dados) {
    await atualizarRequisicao(requisicao.id, dados);
    onRequisicaoUpdated();
    onClose();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label-Editform">
          Status da requisição
          <select
            className="input-Editform"
            {...register('status', {
              required: 'Status da requisição é obrigatório',
            })}
            defaultValue="aguardando"
          >
            <option value="">Selecione o status</option>
            <option value="aguardando">Aguardando</option>
            <option value="em andamento" disabled={numeroCotacoes < 1}>
              Em Andamento
            </option>
            <option value="finalizada" disabled={numeroCotacoes < 3}>
              Finalizada
            </option>
          </select>
          {errors.status && (
            <span className="error-message">{errors.status.message}</span>
          )}
        </label>

        <label htmlFor="cotacao" className="label-Registerform">
          Cotações
        </label>
        <select
          id="cotacao"
          className="input-Registerform"
          {...register('cotacao')}
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
      <CotacoesForm
        onCotacaoAdded={fetchCotacoes}
        produto={requisicao.produto}
      />
    </div>
  );
}

export default RequisicoesEdit;
