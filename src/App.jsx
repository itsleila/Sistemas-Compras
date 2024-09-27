import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './infra/firebase';
import './App.css';
import Produtos from './pages/Produtos/ProdutosList';
import FornecedoresList from './pages/Fornecedores/FornecedoresList';
import ContatoList from './pages/Contatos/ContatoList';
import CotacoesList from './pages/Cotacoes/CotacoesList';
import Home from './pages/Home';
import Configuracoes from './pages/Configuracoes/Configuracoes';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Login from './pages/Login/Login';
import CriarConta from './pages/Login/CriarConta';
import ProtectedRoute from './components/ProtectedRoute';
import Requisicoes from './pages/Requisicoes/RequisicoesList';
import userForm from './pages/Configuracoes/UserForm';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const autenticacao = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(!!userData.isAdmin);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUsuario(null);
        setIsAdmin(false);
      }
    });

    return () => autenticacao();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout usuario={usuario} setUsuario={setUsuario} />}
        >
          <Route index element={<Home usuario={usuario} isAdmin={isAdmin} />} />
          <Route
            path="produtos"
            element={
              <ProtectedRoute usuario={usuario}>
                <Produtos isAdmin={isAdmin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="fornecedores"
            element={
              <ProtectedRoute usuario={usuario}>
                <FornecedoresList isAdmin={isAdmin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="contatos"
            element={
              <ProtectedRoute usuario={usuario}>
                <ContatoList isAdmin={isAdmin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="cotacoes"
            element={
              <ProtectedRoute usuario={usuario}>
                <CotacoesList isAdmin={isAdmin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="requisicoes"
            element={
              <ProtectedRoute usuario={usuario}>
                <Requisicoes isAdmin={isAdmin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="configuracoes"
            element={
              <ProtectedRoute usuario={usuario}>
                <Configuracoes
                  usuario={usuario}
                  setUsuario={setUsuario}
                  isAdmin={isAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="userForm"
            element={
              <ProtectedRoute usuario={usuario}>
                <userForm
                  usuario={usuario}
                  setUsuario={setUsuario}
                  isAdmin={isAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute usuario={!usuario}>
                <Login setUsuario={setUsuario} />
              </ProtectedRoute>
            }
          />
          <Route
            path="criarConta"
            element={
              <ProtectedRoute usuario={!usuario}>
                <CriarConta setUsuario={setUsuario} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
