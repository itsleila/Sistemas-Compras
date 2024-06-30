import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components';
import { regexCNPJ, regexEmail } from '../../infra/regex';
import { inserirFornecedor } from './fornecedores';

function FornecedoresForm({ onFornecedorAdded }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(dados) {
    let id = await inserirFornecedor(dados);
    reset();
    setShowConfirmation(true);
    if (onFornecedorAdded) {
      onFornecedorAdded();
    }
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  }

  return (
    <div className="registerForm-div">
      <h2 className="registerForm-title">Cadastrar Fornecedores</h2>
      <form className="authForm-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="nomeComercial" className="label-Registerform">
              Nome Comercial
            </label>
            <input
              id="nomeComercial"
              type="text"
              placeholder="nome comercial"
              size={50}
              className="input-Registerform"
              {...register('nome', {
                required: 'Nome comercial é obrigatorio',
                validate: {
                  minLength: (value) =>
                    value.length >= 3 ||
                    'Nome tem que ter pelo menos 3 caracteres',
                  maxLength: (value) =>
                    value.length <= 50 ||
                    'Nome não pode ter mais que 50 caracteres',
                },
              })}
            />
            {errors.nome && (
              <p className="error-message">{errors.nome.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="nomeSocial" className="label-Registerform">
              Razão Social
            </label>
            <input
              id="nomeSocial"
              type="text"
              placeholder="nome empresarial"
              size={50}
              className="input-Registerform"
              {...register('nomeSocial', {
                required: 'Razão Social é obrigatoria',
                validate: {
                  minLength: (value) =>
                    value.length >= 3 ||
                    'Nome tem que ter pelo menos 3 caracteres',
                  maxLength: (value) =>
                    value.length <= 50 ||
                    'Nome não pode ter mais que 50 caracteres',
                },
              })}
            />
            {errors.nomeSocial && (
              <p className="error-message">{errors.nomeSocial.message}</p>
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
              placeholder="email@gmail.com"
              size={30}
              className="input-Registerform"
              {...register('email', {
                required: 'Email é obrigatorio',
                validate: {
                  minLength: (value) =>
                    value.length >= 5 ||
                    'Email tem que ter pelo menos 5 caracteres',
                  maxLength: (value) =>
                    value.length <= 30 ||
                    'Email não pode ter mais que 30 caracteres',
                  matchPattern: (value) =>
                    regexEmail.test(value) || 'Email inválido',
                },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="site" className="label-Registerform">
              Site
            </label>
            <input
              id="site"
              type="text"
              placeholder="empresa.com"
              className="input-Registerform"
              {...register('site', {})}
            />
            {errors.site && (
              <p className="error-message">{errors.site.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="cnpj" className="label-Registerform">
              CNPJ
            </label>
            <input
              id="cnpj"
              type="text"
              placeholder="99.999.999/0001-99"
              size={20}
              className="input-Registerform"
              {...register('cnpj', {
                required: 'CNPJ é obrigatorio',
                validate: {
                  matchPattern: (value) =>
                    regexCNPJ.test(value) || 'CNPJ inválido',
                },
              })}
            />
            {errors.cnpj && (
              <p className="error-message">{errors.cnpj.message}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="endereco" className="label-Registerform">
              Endereço da empresa
            </label>
            <input
              id="endereco"
              placeholder="cidade, rua - numero"
              size={100}
              type="text"
              className="input-Registerform"
              {...register('endereco', {
                required: 'Endereco é obrigatorio',
                validate: {
                  minLength: (value) =>
                    value.length >= 5 ||
                    'Endereço tem que ter pelo menos 5 caracteres',
                  maxLength: (value) =>
                    value.length <= 100 ||
                    'Endereço não pode ter mais que 100 caracteres',
                },
              })}
            />
            {errors.endereco && (
              <p className="error-message">{errors.endereco.message}</p>
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
          Fornecedor cadastrado com sucesso!
        </div>
      )}
    </div>
  );
}

export default FornecedoresForm;
