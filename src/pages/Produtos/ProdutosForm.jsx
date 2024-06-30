import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components';
import { inserirProdutos } from './Produtos';

function ProdutosForm({ onProdutoAdded }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(dados) {
    let id = await inserirProdutos(dados);
    reset();
    setShowConfirmation(true);
    if (onProdutoAdded) {
      onProdutoAdded();
    }
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  }

  return (
    <div className="registerForm-div">
      <h2 className="registerForm-title">Cadastrar Produtos</h2>
      <form className="authForm-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="produto" className="label-Registerform">
              Produto
            </label>
            <input
              id="produto"
              type="text"
              className="input-Registerform"
              {...register('produto', {
                required: 'Produto é obrigatório',
              })}
            />
            {errors.produto && (
              <p className="error-message">{errors.produto.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="categoria" className="label-Registerform">
              Categoria
            </label>
            <input
              id="categoria"
              type="text"
              size={50}
              className="input-Registerform"
              {...register('categoria', {
                required: 'Categoria é obrigatória',
                validate: {
                  minLength: (value) =>
                    value.length >= 5 ||
                    'Categoria tem que ter pelo menos 5 caracteres',
                  maxLength: (value) =>
                    value.length <= 50 ||
                    'Categoria não pode ter mais que 50 caracteres',
                },
              })}
            />
            {errors.categoria && (
              <p className="error-message">{errors.categoria.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
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
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="unidadeMedida" className="label-Registerform">
              Unidade de medida
            </label>
            <input
              id="unidadeMedida"
              type="text"
              placeholder="Digite a unidade de medida"
              size={10}
              className="input-Registerform"
              {...register('unidadeMedida', {
                required: 'Unidade de medida é obrigatória',
                validate: {
                  minLength: (value) =>
                    value.length >= 1 ||
                    'Unidade de medida deve ter pelo menos 1 caractere',
                  maxLength: (value) =>
                    value.length <= 10 ||
                    'Unidade de medida não pode ter mais que 10 caracteres',
                },
              })}
            />
            {errors.unidadeMedida && (
              <p className="error-message">{errors.unidadeMedida.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4 p-1">
          <label htmlFor="descricao" className="label-Registerform">
            Descrição do produto
          </label>
          <textarea
            id="descricao"
            placeholder="Digite a descrição do produto"
            rows={4}
            className="input-Registerform"
            {...register('descricao', {
              required: 'Descrição do produto é obrigatória',
              validate: {
                minLength: (value) =>
                  value.length >= 5 ||
                  'Descrição deve ter pelo menos 5 caracteres',
                maxLength: (value) =>
                  value.length <= 200 ||
                  'Descrição não pode ter mais que 200 caracteres',
              },
            })}
          />
          {errors.descricao && (
            <p className="error-message">{errors.descricao.message}</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Button
            size="large"
            type="submit"
            color="blueRibbon"
            text="Cadastrar"
            sx={{ width: '100%' }}
          />
        </div>
      </form>
      {showConfirmation && (
        <div className="FormConfirmation-message">
          Produto cadastrado com sucesso!
        </div>
      )}
    </div>
  );
}

export default ProdutosForm;
