import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components';
import { listarFornecedores } from '../Fornecedores/fornecedores';
import { regexPreco } from '../../infra/regex';
import { listarProdutos } from '../Produtos/Produtos';
import { inserirCotacoes } from './Cotacoes';

function CotacoesForm({ onCotacaoAdded }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    async function fetchFornecedores() {
      const fornecedoresList = await listarFornecedores();
      setFornecedores(fornecedoresList);
    }
    fetchFornecedores();
  }, []);

  useEffect(() => {
    async function fetchProdutos() {
      const produtosList = await listarProdutos();
      setProdutos(produtosList);
    }
    fetchProdutos();
  }, []);

  async function onSubmit(dados) {
    dados.preco = dados.preco.replace(',', '.');
    dados.preco = parseFloat(dados.preco);
    await inserirCotacoes(dados);
    reset();
    setShowConfirmation(true);
    if (onCotacaoAdded) {
      onCotacaoAdded();
    }
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  }

  return (
    <div className="registerForm-div shadow-md mt-9">
      <h2 className="modal-title">Cadastrar Cotação</h2>
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
            <label htmlFor="preco" className="label-Registerform">
              Preço
            </label>
            <input
              id="preco"
              type="text"
              placeholder="99,99"
              className="input-Registerform"
              {...register('preco', {
                required: 'Preço é obrigatório',
                validate: {
                  matchPattern: (value) =>
                    regexPreco.test(value) || 'Preço inválido',
                },
              })}
            />
            {errors.preco && (
              <p className="error-message">{errors.preco.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
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
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="data" className="label-Registerform">
              Data
            </label>
            <input
              id="data"
              type="date"
              className="input-Registerform"
              {...register('data', {
                required: 'Data é obrigatória',
              })}
            />
            {errors.data && (
              <p className="error-message">{errors.data.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Button
            size="large"
            color="blueRibbon"
            text="Cadastrar"
            type="submit"
            sx={{ width: '100%' }}
          />
        </div>
      </form>
      {showConfirmation && (
        <div className="FormConfirmation-message">
          Cotação cadastrada com sucesso!
        </div>
      )}
    </div>
  );
}

export default CotacoesForm;
