import React, { useState, useEffect, useReducer } from 'react';
import { excluirContato, listarContatos } from './Contato';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContatoForm from './ContatoForm';
import ContatosEdit from './ContatosEdit';
import { Container, Modal } from '../../components';
import { DataTable } from '../../components';
import { Tooltip } from '@mui/material';

const initialState = {
  contatos: [],
  abrirModalEdit: false,
  abrirModalConfirm: false,
  selectedContato: null,
};

function reducer(estado, acao) {
  switch (acao.type) {
    case 'CONTATOS':
      return { ...estado, contatos: acao.payload };
    case 'ABRIR_MODALEDIT':
      return {
        ...estado,
        abrirModalEdit: true,
        selectedContato: acao.payload,
      };
    case 'FECHAR_MODALEDIT':
      return { ...estado, abrirModalEdit: false, selectedContato: null };
    case 'ABRIR_MODALCONFIRM':
      return {
        ...estado,
        abrirModalConfirm: true,
        selectedContato: acao.payload,
      };
    case 'FECHAR_MODALCONFIRM':
      return { ...estado, abrirModalConfirm: false, selectedContato: null };
    default:
      return estado;
  }
}

function ContatoList({ isAdmin }) {
  const [estado, dispatch] = useReducer(reducer, initialState);
  const { contatos, abrirModalEdit, abrirModalConfirm, selectedContato } =
    estado;

  useEffect(() => {
    fetchContatos();
  }, []);

  async function fetchContatos() {
    const contatosList = await listarContatos();
    dispatch({ type: 'CONTATOS', payload: contatosList });
  }

  const handleDelete = async () => {
    if (selectedContato) {
      await excluirContato(selectedContato.id);
      fetchContatos();
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
      name: 'Telefone',
      selector: (row) => row.telefone,
      sortable: true,
    },
    {
      name: 'Cargo',
      selector: (row) => row.cargo,
      sortable: true,
    },
    {
      name: 'Fornecedor',
      selector: (row) => row.fornecedor,
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row) => (
        <div>
          <Tooltip
            title={
              isAdmin ? 'Editar' : 'Apenas administradores podem modificar'
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
              isAdmin ? 'Excluir' : 'Apenas administradores podem modificar'
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
          <h2 className="painel-title">Contato</h2>
          <p className="painel-paragrafo">
            Lista com todos os contatos já cadastrados.
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={contatos} pagination />

      {isAdmin && (
        <Modal
          open={abrirModalEdit}
          onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
          title="Editar Contato"
        >
          {selectedContato && (
            <ContatosEdit
              contato={selectedContato}
              onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
              onContatoUpdated={fetchContatos}
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
          <p>Tem certeza que deseja excluir este contato?</p>
        </Modal>
      )}

      {isAdmin && <ContatoForm onContatoAdded={fetchContatos} />}
    </Container>
  );
}

export default ContatoList;
