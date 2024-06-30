import { Container } from '@mui/material';
import React from 'react';
import { Button } from '../components';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container
      sx={{
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="flex flex-col items-center text-center">
        <h1 className=" font-mono text-7xl ">404!</h1>
        <p className="font-mono text-sm font-extralight">
          A página que você está procurando não foi encontrada.
        </p>
        <Link to={'/'}>
          <Button
            text="Voltar para home"
            color="blueRibbon"
            sx={{ margin: 2 }}
          />
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
