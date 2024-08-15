import React from 'react';

const DefaultFooter = () => {
  return (
    <div className="bg-blue-ribbon text-center min-h-36 flex items-center justify-center  flex-col">
      <p className="text-white mx-0">© Todos os direitos reservado</p>
      <a
        className="text-slate-200 mx-0 underline hover:text-slate-950"
        href="../../info.html"
      >
        Mais Informações
      </a>
    </div>
  );
};

export default DefaultFooter;
