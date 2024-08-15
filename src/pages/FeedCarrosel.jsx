import React, { useEffect, useState } from 'react';
import { listarProdutos } from '../pages/Produtos/Produtos';
import Carrosel from '../components/Carrosel';

const FeedCarrosel = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      const produtosList = await listarProdutos();
      setProdutos(produtosList.slice(-15));
    }

    fetchProdutos();
  }, []);

  return (
    <>
      <Carrosel produtos={produtos} />
    </>
  );
};

export default FeedCarrosel;
