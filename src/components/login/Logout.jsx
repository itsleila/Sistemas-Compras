import React from 'react';
import { Button } from '../index';

const Logout = ({ usuario, setUsuario }) => {
  const handleClick = () => {
    setUsuario(null);
  };

  return (
    <div>
      <p>
        <b>Usuario:</b>{' '}
        <span className="italic underline underline-offset-8">
          {' '}
          {usuario?.email}
        </span>
        <Button
          text="Logout"
          size="small"
          onClick={handleClick}
          sx={{ marginLeft: 2 }}
        />
      </p>
    </div>
  );
};

export default Logout;
