import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../index';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../infra/firebase';

const CriarConta = ({ setUsuario }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setError('As senhas não correspondem.');
      return;
    } else {
      setError('');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha,
      );
      const usuario = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
      };
      setUsuario(usuario);
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setSuccessMessage('Usuário criado com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('O email já está em uso.');
      } else if (error.code === 'auth/weak-password') {
        setError('A senha é muito fraca.');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="authForm-container">
      <h2 className="authForm-title">Bem-vindo!</h2>
      <div className="authForm-div">
        <form className="authForm-form">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label htmlFor="grid-email" className="label-form">
                Email
              </label>
              <input
                id="grid-email"
                type="text"
                placeholder="email@gmail.com"
                className="input-form"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label className="label-form" htmlFor="grid-password">
                Senha
              </label>
              <input
                className="input-form mb-3 "
                id="grid-password"
                type="password"
                placeholder="******************"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="label-form" htmlFor="grid-password-confirm">
                Confirme a Senha
              </label>
              <input
                className="input-form mb-3 "
                id="grid-password-confirm"
                type="password"
                placeholder="******************"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
            <p className="text-gray-600 text-xs ml-3 italic">
              Faça a senha tão longa e louca quanto você quiser
            </p>
          </div>
          {error && <p className="FormError-message">{error}</p>}
          {successMessage && (
            <p className="FormConfirmation-message">{successMessage}</p>
          )}
          <div className="flex flex-col items-center">
            <Button
              text="Criar Conta"
              size="large"
              color="zinc95"
              onClick={handleSubmit}
              sx={{ marginRight: 2, width: '100%' }}
            />
            <Link to="/login" className="formLink">
              Já tem uma conta? Faça login.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarConta;
