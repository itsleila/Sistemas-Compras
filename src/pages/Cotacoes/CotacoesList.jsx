import React, { useEffect, useReducer, useState } from 'react';
import { Container, Modal } from '../../components';
import { DataTable } from '../../components';
import { excluirCotacao, listarCotacoes } from './Cotacoes';
import CotacoesForm from './CotacoesForm';
import CotacoesEdit from './CotacoesEdit';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const initialState = {
  cotacoes: [],
  abrirModalEdit: false,
  abrirModalConfirm: false,
  selectedCotacao: null,
};

function reducer(estado, acao) {
  switch (acao.type) {
    case 'COTACOES':
      return { ...estado, cotacoes: acao.payload };
    case 'ABRIR_MODALEDIT':
      return {
        ...estado,
        abrirModalEdit: true,
        selectedCotacao: acao.payload,
      };
    case 'FECHAR_MODALEDIT':
      return { ...estado, abrirModalEdit: false, selectedCotacao: null };
    case 'ABRIR_MODALCONFIRM':
      return {
        ...estado,
        abrirModalConfirm: true,
        selectedCotacao: acao.payload,
      };
    case 'FECHAR_MODALCONFIRM':
      return { ...estado, abrirModalConfirm: false, selectedCotacao: null };
    default:
      return estado;
  }
}

function Cotacoes({ isAdmin }) {
  const [estado, dispatch] = useReducer(reducer, initialState);
  const { cotacoes, abrirModalEdit, abrirModalConfirm, selectedCotacao } =
    estado;

  useEffect(() => {
    fetchCotacoes();
  }, []);

  async function fetchCotacoes() {
    const cotacoesList = await listarCotacoes();
    dispatch({ type: 'COTACOES', payload: cotacoesList });
  }

  const handleDelete = async () => {
    if (selectedCotacao) {
      await excluirCotacao(selectedCotacao.id);
      fetchCotacoes();
      dispatch({ type: 'FECHAR_MODALCONFIRM' });
    }
  };

  const columns = [
    {
      name: 'Preço',
      selector: (row) => row.preco,
      sortable: true,
    },
    {
      name: 'Produto',
      selector: (row) => row.produto,
      sortable: true,
    },
    {
      name: 'Fornecedor',
      selector: (row) => row.fornecedor,
      sortable: true,
    },
    {
      name: 'Data',
      selector: (row) => row.data,
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row) => (
        <div>
          <Tooltip
            title={
              isAdmin ? 'editar' : 'Apenas adiminstradores podem modificar'
            }
          >
            <EditIcon
              style={{ cursor: 'pointer', marginRight: '10px' }}
              onClick={() =>
                dispatch({ type: 'ABRIR_MODALEDIT', payload: row })
              }
            />
          </Tooltip>

          <Tooltip
            title={
              isAdmin ? 'excluir' : 'Apenas adiminstradores podem modificar'
            }
          >
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              onClick={() =>
                dispatch({ type: 'ABRIR_MODALCONFIRM', payload: row })
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth={'lx'} sx={{ padding: 2 }}>
      <div className="header-div">
        <div>
          <h2 className="painel-title">Cotações</h2>
          <p className="painel-paragrafo">
            Lista com todas as cotações já cadastradas.
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={cotacoes} pagination />
      {/* {isAdmin && <CotacoesForm onCotacaoAdded={fetchCotacoes} />}*/}
      {isAdmin && (
        <Modal
          open={abrirModalEdit}
          onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
          title="Editar Cotações"
        >
          {selectedCotacao && (
            <CotacoesEdit
              cotacao={selectedCotacao}
              onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
              onCotacaoUpdated={fetchCotacoes}
            />
          )}
        </Modal>
      )}
      {isAdmin && (
        <Modal
          open={abrirModalConfirm}
          onClose={() => dispatch({ type: 'FECHAR_MODALCONFIRM' })}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
        >
          <p className="modal-paragrafo">
            Tem certeza que deseja excluir esta cotação?
          </p>
        </Modal>
      )}
    </Container>
  );
}
export default Cotacoes;
