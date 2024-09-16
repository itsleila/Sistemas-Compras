import React, { useEffect, useReducer, useState } from 'react';
import { Container, Modal } from '../../components';
import { DataTable } from '../../components';
import { excluirProduto, listarProdutos } from './Produtos';
import ProdutosForm from './ProdutosForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProdutosEdit from './ProdutosEdit';
import { Tooltip } from '@mui/material';

const initialState = {
  produtos: [],
  abrirModalEdit: false,
  abrirModalConfirm: false,
  selectedProduto: null,
};

function reducer(estado, acao) {
  switch (acao.type) {
    case 'PRODUTOS':
      return { ...estado, produtos: acao.payload };
    case 'ABRIR_MODALEDIT':
      return {
        ...estado,
        abrirModalEdit: true,
        selectedProduto: acao.payload,
      };
    case 'FECHAR_MODALEDIT':
      return { ...estado, abrirModalEdit: false, selectedProduto: null };
    case 'ABRIR_MODALCONFIRM':
      return {
        ...estado,
        abrirModalConfirm: true,
        selectedProduto: acao.payload,
      };
    case 'FECHAR_MODALCONFIRM':
      return { ...estado, abrirModalConfirm: false, selectedProduto: null };
    default:
      return estado;
  }
}

function Produtos({ isAdmin }) {
  const [estado, dispatch] = useReducer(reducer, initialState);
  const { produtos, abrirModalEdit, abrirModalConfirm, selectedProduto } =
    estado;

  useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    const produtosList = await listarProdutos();
    dispatch({ type: 'PRODUTOS', payload: produtosList });
  }

  const handleDelete = async () => {
    if (selectedProduto) {
      await excluirProduto(selectedProduto.id);
      fetchProdutos();
      dispatch({ type: 'FECHAR_MODALCONFIRM' });
    }
  };

  const columns = [
    {
      name: 'Produto',
      selector: (row) => row.produto,
      sortable: true,
    },
    {
      name: 'Categoria',
      selector: (row) => row.categoria,
      sortable: true,
    },
    {
      name: 'Quantidade',
      selector: (row) => row.quantidade,
      sortable: true,
    },
    {
      name: 'Unidade de medida',
      selector: (row) => row.unidadeMedida,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: (row) => row.descricao,
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
          <h2 className="painel-title">Produtos</h2>
          <p className="painel-paragrafo">
            Lista com todos os produtos já cadastrados.
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={produtos} pagination />
      {isAdmin && (
        <Modal
          open={abrirModalEdit}
          onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
          title="Editar Produto"
        >
          {selectedProduto && (
            <ProdutosEdit
              produto={selectedProduto}
              onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
              onProdutoUpdated={fetchProdutos}
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
            Tem certeza que deseja excluir este produto?
          </p>
        </Modal>
      )}
      {isAdmin && <ProdutosForm onProdutoAdded={fetchProdutos} />}
    </Container>
  );
}
export default Produtos;
