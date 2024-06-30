import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarFornecedor } from './fornecedores';
import { Button } from '../../components';

function FornecedoresEditar({ fornecedor, onClose, onFornecedorUpdated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(fornecedor);
  }, [fornecedor, reset]);

  async function onSubmit(dados) {
    await atualizarFornecedor(fornecedor.id, dados);
    onFornecedorUpdated();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label-Editform">
        Nome:
        <input
          className="input-Editform"
          {...register('nome', { required: 'Nome é obrigatório' })}
        />
        {errors.nome && (
          <span className="error-message">{errors.nome.message}</span>
        )}
      </label>
      <label className="label-Editform">
        Email:
        <input
          className="input-Editform"
          {...register('email', { required: 'Email é obrigatório' })}
        />
        {errors.email && (
          <span className="error-message">
            {errors.email.message} <br />{' '}
          </span>
        )}
      </label>
      <label className="label-Editform">
        Site:
        <input className="input-Editform" {...register('site')} />
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

export default FornecedoresEditar;
