import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProdutosList from './pages/Produtos/ProdutosList';
import FornecedoresList from './pages/Fornecedores/FornecedoresList';
import ContatoList from './pages/Contatos/ContatoList';
import CotacoesList from './pages/Cotacoes/CotacoesList';
import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Login from './components/login/Login';
import CriarConta from './components/login/CriarConta';
import FornecedoresForm from './pages/Fornecedores/FornecedoresForm';
import ContatoForm from './pages/Contatos/ContatoForm';
import CotacoesForm from './pages/Cotacoes/CotacoesForm';
import ProdutosForm from './pages/Produtos/ProdutosForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout usuario={usuario} setUsuario={setUsuario} />}
        >
          <Route index element={<Home usuario={usuario} />} />
          <Route
            path="produtos"
            element={
              <ProtectedRoute usuario={usuario}>
                <ProdutosList />
              </ProtectedRoute>
            }
          />
          <Route
            path="fornecedores"
            element={
              <ProtectedRoute usuario={usuario}>
                <FornecedoresList />
              </ProtectedRoute>
            }
          />
          <Route
            path="contatos"
            element={
              <ProtectedRoute usuario={usuario}>
                <ContatoList />
              </ProtectedRoute>
            }
          />
          <Route
            path="cotacoes"
            element={
              <ProtectedRoute usuario={usuario}>
                <CotacoesList />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login setUsuario={setUsuario} />} />
          <Route
            path="criarConta"
            element={<CriarConta setUsuario={setUsuario} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
