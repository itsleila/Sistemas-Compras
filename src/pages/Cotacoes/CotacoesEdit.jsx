import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarCotacao } from './Cotacoes';
import { regexPreco } from '../../infra/regex';
import { Button } from '../../components';

function CotacoesEdit({ cotacao, onClose, onCotacaoUpdated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(cotacao);
  }, [cotacao, reset]);

  async function onSubmit(dados) {
    await atualizarCotacao(cotacao.id, dados);
    onCotacaoUpdated();
    onClose();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-Editform">
        Preço
        <input
          className="input-Editform"
          {...register('preco', {
            required: 'Preço é obrigatório',
            validate: {
              matchPattern: (value) =>
                regexPreco.test(value) || 'Preço inválido',
            },
          })}
        />
        {errors.preco && (
          <span className="error-message">{errors.preco.message}</span>
        )}
      </label>
      <label className="label-Editform">
        Data
        <input
          className="input-Editform"
          {...register('data', {
            required: 'Data é obrigatória',
          })}
        />
        {errors.data && (
          <span className="error-message">
            {errors.data.message} <br />{' '}
          </span>
        )}
      </label>
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
export default CotacoesEdit;
