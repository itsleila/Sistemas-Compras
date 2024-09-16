import React, { useEffect, useReducer, useState } from 'react';
import { Container } from '../../components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from '../../components';
import { listarFornecedores, excluirFornecedor } from './fornecedores';
import FornecedoresForm from './FornecedoresForm';
import FornecedoresEditar from './FornecedoresEditar';
import Modal from '../../components/Modal';
import { Tooltip } from '@mui/material';

const initialState = {
  fornecedores: [],
  abrirModalEdit: false,
  abrirModalConfirm: false,
  selectedFornecedor: null,
};

function reducer(estado, acao) {
  switch (acao.type) {
    case 'FORNECEDORES':
      return { ...estado, fornecedores: acao.payload };
    case 'ABRIR_MODALEDIT':
      return {
        ...estado,
        abrirModalEdit: true,
        selectedFornecedor: acao.payload,
      };
    case 'FECHAR_MODALEDIT':
      return { ...estado, abrirModalEdit: false, selectedFornecedor: null };
    case 'ABRIR_MODALCONFIRM':
      return {
        ...estado,
        abrirModalConfirm: true,
        selectedFornecedor: acao.payload,
      };
    case 'FECHAR_MODALCONFIRM':
      return { ...estado, abrirModalConfirm: false, selectedFornecedor: null };
    default:
      return estado;
  }
}

function Fornecedores({ isAdmin }) {
  const [estado, dispatch] = useReducer(reducer, initialState);
  const {
    fornecedores,
    abrirModalEdit,
    abrirModalConfirm,
    selectedFornecedor,
  } = estado;

  useEffect(() => {
    fetchFornecedores();
  }, []);

  async function fetchFornecedores() {
    const fornecedoresList = await listarFornecedores();
    dispatch({ type: 'FORNECEDORES', payload: fornecedoresList });
  }

  const handleDelete = async () => {
    if (selectedFornecedor) {
      await excluirFornecedor(selectedFornecedor.id);
      fetchFornecedores();
      dispatch({ type: 'FECHAR_MODALCONFIRM' });
    }
  };

  const columns = [
    {
      name: 'Nome',
      selector: (row) => row.nome,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Site',
      selector: (row) => row.site,
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
          <h2 className="painel-title">Fornecedores</h2>
          <p className="painel-paragrafo">
            Lista com todos os Fornecedores já cadastrados.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={fornecedores}
        pagination
        noDataComponent={'Nenhum fornecedor cadastrado ainda'}
      />
      {isAdmin && <FornecedoresForm onFornecedorAdded={fetchFornecedores} />}

      {isAdmin && (
        <Modal
          open={abrirModalEdit}
          onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
          title="Editar Fornecedor"
        >
          {selectedFornecedor && (
            <FornecedoresEditar
              fornecedor={selectedFornecedor}
              onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
              onFornecedorUpdated={fetchFornecedores}
            />
          )}
        </Modal>
      )}

      {isAdmin && (
        <Modal
          open={abrirModalConfirm}
          onClose={() => dispatch({ type: 'FECHAR_MODALCONFIRM' })}
          title="Confirma Exclusão"
          onConfirm={handleDelete}
        >
          <p className="modal-paragrafo">
            Tem certeza que deseja excluir este fornecedor?
          </p>
        </Modal>
      )}
    </Container>
  );
}

export default Fornecedores;
