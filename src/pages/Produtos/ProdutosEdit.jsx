import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarProduto } from './Produtos';
import { Button } from '../../components';

function ProdutosEdit({ produto, onClose, onProdutoUpdated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(produto);
  }, [produto, reset]);

  async function onSubmit(dados) {
    await atualizarProduto(produto.id, dados);
    onProdutoUpdated();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-Editform">
        Produto:
        <input
          className="input-Editform"
          {...register('produto', { required: 'Produto é obrigatório' })}
        />
        {errors.produto && (
          <span className="error-message">{errors.produto.message}</span>
        )}
      </label>
      <label className="label-Editform">
        Categoria:
        <input
          className="input-Editform"
          {...register('categoria', { required: 'Categoria é obrigatório' })}
        />
        {errors.categoria && (
          <span className="error-message">{errors.categoria.message}</span>
        )}
      </label>
      <label className="label-Editform">
        Quantidade inicial:
        <input
          className="input-Editform"
          {...register('quantidade', {
            required: 'Quantidade inicial é obrigatório',
          })}
        />
        {errors.quantidade && (
          <span className="error-message">{errors.quantidade.message}</span>
        )}
      </label>
      <label className="label-Editform">
        Unidade de medida:
        <input
          className="input-Editform"
          {...register('unidadeMedida', {
            required: 'Unidade de medida é obrigatório',
          })}
        />
        {errors.unidadeMedida && (
          <span className="error-message">
            {errors.unidadeMedida.message} <br />{' '}
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
export default ProdutosEdit;
