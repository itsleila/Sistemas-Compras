import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { atualizarUsuario, obterUsuario } from './UserSettings';
import { Button } from '../../components';
import { regexEmail } from '../../infra/regex';
import { auth, updatePassword } from '../../infra/firebase';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  updateEmail as firebaseUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

const UserForm = ({ usuario, setUsuario }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const usuarioAtual = auth.currentUser;

  useEffect(() => {
    if (usuarioAtual) {
      fetchUsuario(usuarioAtual.uid);
    }
  }, [usuarioAtual]);

  async function fetchUsuario(uid) {
    try {
      const usuarioSelecionado = await obterUsuario(uid);
      setUsuario(usuarioSelecionado);
      setValue('ID', usuarioSelecionado?.uid || '');
      setValue('email', usuarioSelecionado?.email || '');
    } catch (error) {
      setError('Erro ao buscar usuário');
    }
  }

  async function onSubmit(dados) {
    try {
      if (dados.email && dados.email !== usuarioAtual.email) {
        await atualizarEmail(dados.email);
        await atualizarUsuario(usuarioAtual.uid, { email: dados.email });
        setSuccessMessage('Email atualizado com sucesso!');
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          email: dados.email,
        }));
      }
      if (dados.senha && senhaAtual) {
        await atualizarSenha(dados.senha);
      }
      reset();
    } catch (error) {
      setError('Erro ao atualizar usuário');
    }
  }

  const atualizarEmail = async (novoEmail) => {
    if (usuarioAtual) {
      try {
        if (!senhaAtual) {
          setError('Senha atual é obrigatória para atualizar o e-mail.');
          return;
        }
        const credential = EmailAuthProvider.credential(
          usuarioAtual.email,
          senhaAtual,
        );
        await reauthenticateWithCredential(usuarioAtual, credential);
        await firebaseUpdateEmail(usuarioAtual, novoEmail);
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          setError('Por favor, faça login novamente para atualizar o e-mail.');
        } else if (error.code === 'auth/invalid-credential') {
          setError('Credenciais inválidas fornecidas para reautenticação.');
        } else {
          setError('Erro ao atualizar email');
        }
      }
    }
  };

  const atualizarSenha = async (novaSenha) => {
    if (usuarioAtual && novaSenha) {
      try {
        if (!senhaAtual) {
          setError('Senha atual é obrigatória para atualizar a senha.');
          return;
        }

        const credential = EmailAuthProvider.credential(
          usuarioAtual.email,
          senhaAtual,
        );
        await reauthenticateWithCredential(usuarioAtual, credential);
        await updatePassword(usuarioAtual, novaSenha);
        setSuccessMessage('Senha atualizada com sucesso.');
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          setError('Por favor, faça login novamente para atualizar a senha.');
        } else if (error.code === 'auth/invalid-credential') {
          setError('Credenciais inválidas fornecidas para reautenticação.');
        } else {
          setError('Erro ao atualizar senha');
        }
      }
    }
  };
  return (
    <div className="authForm-container">
      <h2 className="authForm-title">Perfil</h2>
      <div className="authForm-div">
        <form className="authForm-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 p-1">
            <label htmlFor="ID" className="label-Registerform">
              ID
            </label>
            <input
              id="ID"
              type="text"
              className="input-Registerform"
              readOnly
              {...register('ID')}
              style={{ opacity: '0.5' }}
            />
          </div>
          <div className="mb-4 p-1">
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
          <div className="mt-2 mb-4">
            <label htmlFor="senhaAtual" className="label-Registerform">
              Senha Atual
            </label>
            <input
              id="senhaAtual"
              type="password"
              placeholder="*******"
              className="input-Registerform"
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
          </div>
          <div className="mt-2 mb-4">
            <label htmlFor="senhaNova" className="label-Registerform">
              Nova Senha
            </label>
            <div className="flex items-center relative">
              <input
                id="senhaNova"
                type={showPassword ? 'text' : 'password'}
                placeholder="*******"
                className="input-Registerform pr-10"
                {...register('senha')}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            {errors.senha && (
              <p className="error-message">{errors.senha.message}</p>
            )}
          </div>
          {successMessage && (
            <p className="FormConfirmation-message">{successMessage}</p>
          )}
          {error && <p className="FormError-message">{error}</p>}
          <div className="flex justify-center flex-col">
            <Button
              text="Alterar"
              type="submit"
              size="large"
              color="zinc95"
              sx={{ marginRight: 2 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
