import React from 'react';
import { Header, Footer } from '../components';
import { Outlet } from 'react-router-dom';

export default function Layout({ usuario, setUsuario }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header usuario={usuario} setUsuario={setUsuario} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
