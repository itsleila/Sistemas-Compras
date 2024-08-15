import React from 'react';
import { Link } from 'react-router-dom';
import { BarraLogin, Container } from '../components';
import FeedCarrosel from './FeedCarrosel';

function Home({ usuario }) {
  return (
    <>
      <main>
        {usuario && (
          <nav>
            <ul className="nav-div">
              <li>
                <Link to={'/requisicoes'} className="nav-link">
                  Requisições
                </Link>
              </li>
              <li>
                <Link to={'/cotacoes'} className="nav-link">
                  Cotações
                </Link>
              </li>
              <li>
                <Link to={'/produtos'} className="nav-link">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to={'/fornecedores'} className="nav-link">
                  Fornecedores
                </Link>
              </li>
              <li>
                <Link to={'/contatos'} className="nav-link">
                  Contatos
                </Link>
              </li>
            </ul>
          </nav>
        )}
        {!usuario && <hr className="bg-blue-ribbon h-0.5" />}
        <Container
          maxWidth="lg"
          sx={{
            minHeight: '60vh',
            padding: '50px',
            margin: '0 auto',
          }}
        >
          <p className="paragrafo-azul">
            Um sistema projetado para simplificar sua vida e reduzir seus gastos
          </p>
          <h2 className="home-titulo">
            Obtenha total controle e gerencie <br />
            <span> todas suas compras de forma eficiente</span>
          </h2>
          <p className="paragrafo-descricao">
            Registre todas as informações necessárias para auxiliar suas
            decisões na hora de escolher onde comprar seus produtos.
            <br />
            Tenha acesso a um histórico de compras e compartilhe os preços da
            maneira que preferir.
          </p>
          {!usuario && (
            <div className=" text-center my-5 py-3">
              <BarraLogin buttonSize="meddium" />
            </div>
          )}
          {usuario && (
            <div className="my-20">
              <FeedCarrosel />
            </div>
          )}
        </Container>
      </main>
    </>
  );
}

export default Home;
