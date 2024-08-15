import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components';
import { regexCEP, regexCNPJ, regexEmail } from '../../infra/regex';
import { inserirFornecedor } from './fornecedores';
import obterEndereco from '../../infra/cep';

function FornecedoresForm({ onFornecedorAdded }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [erro, setErro] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(dados) {
    try {
      let id = await inserirFornecedor(dados);
      reset();
      setShowConfirmation(true);
      if (onFornecedorAdded) {
        onFornecedorAdded();
      }
      setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao inserir fornecedor:', error);
      setErro('Erro ao cadastrar fornecedor');
    }
  }

  async function handleChangeEndereco(e) {
    const cep = e.target.value.replace(/\D/g, '');
    if (regexCEP.test(cep)) {
      try {
        const enderecoObtido = await obterEndereco(cep);
        if (enderecoObtido && !enderecoObtido.erro) {
          setErro(null);
          setShowInputs(true);
          setValue('logradouro', enderecoObtido.logradouro || '');
          setValue('bairro', enderecoObtido.bairro || '');
          setValue('localidade', enderecoObtido.localidade || '');
          setValue('uf', enderecoObtido.uf || '');
        } else {
          setErro('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao obter endereço:', error);
        setErro('Erro ao buscar endereço');
      }
    } else {
      setErro('CEP inválido');
    }
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
            <label htmlFor="cep" className="label-Registerform">
              Endereço
            </label>
            <input
              id="cep"
              placeholder="CEP (EX: 01001000)"
              size={100}
              type="text"
              className="input-Registerform"
              {...register('cep', {
                onChange: (e) => {
                  handleChangeEndereco(e);
                },
                required: 'CEP é obrigatorio',
                validate: {
                  matchPattern: (value) =>
                    regexCEP.test(value) || 'CEP inválido',
                },
              })}
            />
            {errors.cep && (
              <p className="error-message">{errors.cep.message}</p>
            )}
          </div>
        </div>
        {showInputs && (
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="logradouro" className="label-Registerform">
                Logradouro
              </label>
              <input
                id="logradouro"
                type="text"
                placeholder="Logradouro"
                size={50}
                className="input-Registerform"
                {...register('logradouro', {
                  required: 'Logradouro é obrigatorio',
                })}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="bairro" className="label-Registerform">
                Bairro
              </label>
              <input
                id="bairro"
                type="text"
                placeholder="Bairro"
                size={50}
                className="input-Registerform"
                {...register('bairro', {
                  required: 'Bairro é obrigatorio',
                })}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="localidade" className="label-Registerform">
                Localidade
              </label>
              <input
                id="localidade"
                type="text"
                placeholder="Localidade"
                size={50}
                className="input-Registerform"
                {...register('localidade', {
                  required: 'Localidade é obrigatoria',
                })}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="uf" className="label-Registerform">
                UF
              </label>
              <input
                id="uf"
                type="text"
                placeholder="UF"
                size={2}
                className="input-Registerform"
                {...register('uf', {
                  required: 'UF é obrigatorio',
                })}
              />
            </div>
          </div>
        )}
        {erro && <p className="error-message">{erro}</p>}
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
