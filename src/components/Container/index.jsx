import React from 'react';
import { Container } from '@mui/material';

const DefaultContainer = ({ children, maxWidth = 'lg', sx = {}, ...props }) => {
  return (
    <Container maxWidth={maxWidth} sx={{ ...sx }} {...props}>
      {children}
    </Container>
  );
};

export default DefaultContainer;
