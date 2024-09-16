import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarRequisicao, listarRequisicoes } from './Requisicoes';
import { Button } from '../../components';
import { listarCotacoes } from '../Cotacoes/Cotacoes';
import { CSVLink } from 'react-csv';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import CotacoesForm from '../Cotacoes/CotacoesForm';

export function RequisicoesCotacao({
  requisicao,
  onClose,
  onRequisicaoUpdated,
}) {
  const [cotacoes, setCotacoes] = useState([]);
  const [selectedCotacao, setSelectedCotacao] = useState(null);

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
    setCotacoes(filteredCotacoes);
  }

  useEffect(() => {
    if (requisicao.produto) {
      fetchCotacoes();
    }
  }, [requisicao.produto]);

  async function onSubmit(dados) {
    await atualizarRequisicao(requisicao.id, {
      ...dados,
    });
    onRequisicaoUpdated();
    onClose();
  }

  const headers = [
    { label: 'Cotação ID', key: 'id' },
    { label: 'Produto', key: 'produto' },
    { label: 'Preço', key: 'preco' },
    { label: 'Fornecedor', key: 'fornecedor' },
    { label: 'Data', key: 'data' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label-Registerform">Selecione uma cotação</label>
        <div>
          {cotacoes.map((cotacao) => (
            <label
              key={cotacao.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '10px',
                padding: '20px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                maxWidth: '500px',
              }}
            >
              <input
                type="radio"
                value={cotacao.preco}
                style={{
                  margin: '10px',
                  padding: '20px',
                }}
                {...register('cotacao', { required: 'Selecione uma cotação' })}
                onClick={() => setSelectedCotacao(cotacao)}
              />
              {`Nome do produto: ${cotacao.produto}`}
              <br />
              {`Preço: R$${cotacao.preco}`}
              <br />
              {`Fornecedor: ${cotacao.fornecedor}`}
              <br />
              {`Data: ${cotacao.data}`}
            </label>
          ))}
        </div>
        {errors.cotacao && (
          <p className="error-message">{errors.cotacao.message}</p>
        )}

        <div>
          {selectedCotacao ? (
            <CSVLink
              data={[selectedCotacao]}
              headers={headers}
              filename={`Cotacao_${selectedCotacao.produto}.csv`}
            >
              <UploadFileRoundedIcon style={{ cursor: 'pointer' }} />
              exportar cotaçãos em CSV
            </CSVLink>
          ) : (
            <p>Selecione uma cotação para exportar</p>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <Button type="submit" text="Salvar" sx={{ marginRight: '10px' }} />
          <Button
            type="button"
            color="zinc95"
            onClick={onClose}
            text="Cancelar"
          />
        </div>
      </form>
    </div>
  );
}

////////////////////////

export function CadastrarCotacao({
  produto,
  onCotacaoUpdated,
  onRequisicaoUpdated,
  requisicaoId,
}) {
  const [cotacoes, setCotacoes] = useState([]);

  async function fetchCotacoes() {
    const cotacoesList = await listarCotacoes();
    const filteredCotacoes = cotacoesList.filter(
      (cotacao) => cotacao.produto === produto,
    );
    setCotacoes(filteredCotacoes);
  }

  useEffect(() => {
    fetchCotacoes();
  }, [produto]);

  const handleCotacaoAdded = async () => {
    await fetchCotacoes();
    if (onRequisicaoUpdated) {
      onRequisicaoUpdated();
    }
  };

  return (
    <div>
      <CotacoesForm onCotacaoAdded={handleCotacaoAdded} produto={produto} />
    </div>
  );
}
