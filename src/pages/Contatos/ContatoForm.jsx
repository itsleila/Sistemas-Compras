import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components';
import { regexNumerico, regexEmail } from '../../infra/regex';
import { inserirContato } from './Contato';
import { listarFornecedores } from '../Fornecedores/fornecedores';

function ContatoForm({ onContatoAdded }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
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

  async function onSubmit(dados) {
    let id = await inserirContato(dados);
    reset();
    setShowConfirmation(true);
    if (onContatoAdded) {
      onContatoAdded();
    }
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  }

  return (
    <div className="registerForm-div">
      <h2 className="registerForm-title">Cadastrar Contato</h2>
      <form className="authForm-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="nome" className="label-Registerform">
              Nome
            </label>
            <input
              id="nome"
              placeholder="Nome do contato"
              type="text"
              size={50}
              className="input-Registerform"
              {...register('nome', {
                required: 'Nome é obrigatório',
                minLength: {
                  value: 5,
                  message: 'Nome tem que ter pelo menos 5 caracteres',
                },
                maxLength: {
                  value: 50,
                  message: 'Nome não pode ter mais que 50 caracteres',
                },
              })}
            />
            {errors.nome && (
              <p className="error-message">{errors.nome.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="telefone" className="label-Registerform">
              Telefone
            </label>
            <input
              id="telefone"
              type="text"
              placeholder="(99)99999-9999"
              size={20}
              className="input-Registerform"
              {...register('telefone', {
                required: 'Telefone é obrigatório',
                minLength: {
                  value: 11,
                  message: 'Telefone tem que ter pelo menos 14 caracteres',
                },
                maxLength: {
                  value: 20,
                  message: 'Telefone não pode ter mais que 20 caracteres',
                },
                pattern: { value: regexNumerico, message: 'Telefone inválido' },
              })}
            />
            {errors.telefone && (
              <p className="error-message">{errors.telefone.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="email" className="label-Registerform">
              Email
            </label>
            <input
              id="email"
              type="email"
              size={30}
              placeholder="email@gmail.com"
              className="input-Registerform"
              {...register('email', {
                required: 'Email é obrigatório',
                minLength: {
                  value: 5,
                  message: 'Email tem que ter pelo menos 5 caracteres',
                },
                maxLength: {
                  value: 30,
                  message: 'Email não pode ter mais que 30 caracteres',
                },
                pattern: { value: regexEmail, message: 'Email inválido' },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
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
          Contato cadastrado com sucesso!
        </div>
      )}
    </div>
  );
}

export default ContatoForm;
