import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../index';
import Logout from './Logout';

function DefaultBarraLogin({
  usuario,
  setUsuario,
  buttonSize = 'small',
  variant = 'contained',
}) {
  if (usuario) {
    return <Logout usuario={usuario} setUsuario={setUsuario} />;
  } else {
    return (
      <div>
        <Link to={'/login'}>
          <Button
            text="Fazer Login"
            size={buttonSize}
            color="blueRibbon"
            variant={variant}
            sx={{ marginRight: 2 }}
          />
        </Link>
        <Link to={'/criarConta'}>
          <Button text="Criar Conta" size={buttonSize} color="anger" />
        </Link>
      </div>
    );
  }
}

export default DefaultBarraLogin;
