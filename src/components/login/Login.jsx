import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../infra/firebase';
import { Button } from '../index';

const Login = ({ setUsuario }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setSuccessMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha,
      );
      const usuario = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
      };
      setUsuario(usuario);
      setSuccessMessage('Login realizado com sucesso!');
      setEmail('');
      setSenha('');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log('Erro no login:', error);
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/invalid-credential'
      ) {
        setError('Credenciais inválidas. Verifique seu email e/ou senha');
      } else {
        setError('Ocorreu um erro ao fazer login, tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="authForm-container">
      <h2 className="authForm-title">Bem-vindo de volta!</h2>
      <div className="authForm-div">
        <form className="authForm-form">
          <div className="mb-4 p-1">
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
          <div className="mt-2">
            <label htmlFor="grid-password" className="label-form">
              Senha
            </label>
            <input
              id="grid-password"
              type="password"
              placeholder="******************"
              className="input-form mb-3 "
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-2 p-4">
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm">Lembre-se de mim</span>
            </label>
            <a
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Esqueceu a senha?
            </a>
          </div>
          {error && <p className="FormError-message">{error}</p>}
          {successMessage && (
            <p className="FormConfirmation-message">{successMessage}</p>
          )}
          <div className="flex justify-center flex-col">
            <Button
              text="Entrar"
              size="large"
              color="zinc95"
              onClick={handleLogin}
              sx={{ marginRight: 2 }}
            />
            <Link to="/criarConta" className="formLink">
              Ainda não tem uma conta?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
