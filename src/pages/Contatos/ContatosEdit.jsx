import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarContato } from './Contato';
import { Button } from '../../components';

function ContatosEdit({ contato, onClose, onContatoUpdated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(contato);
  }, [contato, reset]);

  async function onSubmit(dados) {
    await atualizarContato(contato.id, dados);
    onContatoUpdated();
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
        {errors.nome && <span>{errors.nome.message}</span>}
      </label>
      <label className="label-Editform">
        Email:
        <input
          className="input-Editform"
          {...register('email', { required: 'Email é obrigatório' })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label className="label-Editform">
        Telefone:
        <input
          className="input-Editform"
          {...register('telefone', { required: 'Telefone é obrigatório' })}
        />
        {errors.cargo && <span>{errors.cargo.message}</span>}
      </label>
      <label className="label-Editform">
        Cargo:
        <input
          className="input-Editform"
          {...register('cargo', { required: 'cargo é obrigatório' })}
        />
        {errors.telefone && <span>{errors.telefone.message}</span>}
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

export default ContatosEdit;
