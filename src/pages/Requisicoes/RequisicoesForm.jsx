import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components';
import { inserirRequisicoes } from './Requisicoes';
import { listarProdutos } from '../Produtos/Produtos';

function RequisicoesForm({ onRequisicaoAdded }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchProdutos() {
      const produtosList = await listarProdutos();
      setProdutos(produtosList);
    }
    fetchProdutos();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  async function onSubmit(dados) {
    let id = await inserirRequisicoes(dados);
    reset();
    setShowConfirmation(true);
    if (onRequisicaoAdded) {
      onRequisicaoAdded();
    }
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  }

  return (
    <div className="registerForm-div">
      <h2 className="registerForm-title">Requisição de Compras</h2>
      <form className="authForm-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="produto" className="label-Registerform">
              Produto
            </label>
            <select
              id="produto"
              className="input-Registerform"
              {...register('produto', {
                required: 'Selecione um produto',
              })}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.produto}>
                  {produto.produto}
                </option>
              ))}
            </select>
            {errors.produto && (
              <p className="error-message">{errors.produto.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="quantidade" className="label-Registerform">
              Quantidade inicial
            </label>
            <input
              id="quantidade"
              type="number"
              placeholder="Digite a quantidade inicial"
              size={10}
              className="input-Registerform"
              {...register('quantidade', {
                required: 'Quantidade inicial é obrigatória',
                validate: {
                  min: (value) =>
                    value > 0 || 'A quantidade deve ser maior que 0',
                },
              })}
            />
            {errors.quantidade && (
              <p className="error-message">{errors.quantidade.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="data" className="label-Registerform">
              Data da requisição
            </label>
            <input
              id="data"
              type="date"
              className="input-Registerform"
              defaultValue={today}
              {...register('data', {
                required: 'Data é obrigatória',
              })}
            />
            {errors.data && (
              <p className="error-message">{errors.data.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="prazo" className="label-Registerform">
              Prazo
            </label>
            <input
              id="prazo"
              type="date"
              className="input-Registerform"
              {...register('prazo', {})}
            />
            {errors.prazo && (
              <p className="error-message">{errors.prazo.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4 p-1">
          <label htmlFor="justificativa" className="label-Registerform">
            Justificativa
          </label>
          <textarea
            id="justificativa"
            placeholder="Escreva sua justificativa para a necessidade desse produto"
            rows={4}
            className="input-Registerform"
            {...register('justificativa', {
              required: 'Justificativa de requisição é obrigatória',
              validate: {
                minLength: (value) =>
                  value.length >= 5 ||
                  'Justificativa deve ter pelo menos 5 caracteres',
                maxLength: (value) =>
                  value.length <= 200 ||
                  'Justificativa não pode ter mais que 200 caracteres',
              },
            })}
          />
          {errors.justificativa && (
            <p className="error-message">{errors.justificativa.message}</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Button
            size="large"
            type="submit"
            color="blueRibbon"
            text="Fazer Requisição"
            sx={{ width: '100%' }}
          />
        </div>
      </form>
      {showConfirmation && (
        <div className="FormConfirmation-message">
          Requisição feita com sucesso!
        </div>
      )}
    </div>
  );
}

export default RequisicoesForm;
