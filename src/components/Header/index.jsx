import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/Logo.svg';
import BarraLogin from '../login/BarraLogin';
import { Container } from '..';

const DefaultHeader = ({ usuario, setUsuario }) => {
  return (
    <Container>
      <nav className="header-div">
        <div>
          <Link to={'/'}>
            <img src={logo} alt="Logo" width="200" height="70" />
          </Link>
        </div>
        <div>
          <BarraLogin usuario={usuario} setUsuario={setUsuario} />
        </div>
      </nav>
    </Container>
  );
};

export default DefaultHeader;
