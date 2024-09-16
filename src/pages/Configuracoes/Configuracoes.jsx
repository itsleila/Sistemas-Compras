import React from 'react';
import UserForm from './UserForm';
import { Container } from '../../components';
import UserList from './UserList';

const Configuracoes = ({ usuario, setUsuario, isAdmin }) => {
  return (
    <Container maxWidth={'lx'} sx={{ padding: 2 }}>
      <h2 className="painel-title">Configurações</h2>
      <p className="painel-paragrafo">
        Página para visualizar e editar seus dados de cadastro.
      </p>
      <UserForm suario={usuario} setUsuario={setUsuario} />
      {isAdmin && <UserList isAdmin={isAdmin} />}
    </Container>
  );
};

export default Configuracoes;
