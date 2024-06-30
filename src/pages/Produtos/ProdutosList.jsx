import React, { useEffect, useState } from 'react';
import { Container, Modal } from '../../components';
import { DataTable } from '../../components';
import { excluirProduto, listarProdutos } from './Produtos';
import ProdutosForm from './ProdutosForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProdutosEdit from './ProdutosEdit';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    const produtosList = await listarProdutos();
    setProdutos(produtosList);
  }

  const handleOpenEditModal = (produto) => {
    setSelectedProduto(produto);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedProduto(null);
  };

  const handleOpenConfirmModal = (produto) => {
    setSelectedProduto(produto);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedProduto(null);
  };

  const handleDelete = async () => {
    if (selectedProduto) {
      await excluirProduto(selectedProduto.id);
      fetchProdutos();
      handleCloseConfirmModal();
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
          <EditIcon
            style={{ cursor: 'pointer', marginRight: '10px' }}
            onClick={() => handleOpenEditModal(row)}
          />
          <DeleteIcon
            style={{ cursor: 'pointer' }}
            onClick={() => handleOpenConfirmModal(row)}
          />
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

      <ProdutosForm onProdutoAdded={fetchProdutos} />

      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        title="Editar Produto"
      >
        {selectedProduto && (
          <ProdutosEdit
            produto={selectedProduto}
            onClose={handleCloseEditModal}
            onProdutoUpdated={fetchProdutos}
          />
        )}
      </Modal>

      <Modal
        open={confirmModalOpen}
        onClose={handleCloseConfirmModal}
        title="Confirmar Exclusão"
        onConfirm={handleDelete}
      >
        <p className="modal-paragrafo">
          Tem certeza que deseja excluir este produto?
        </p>
      </Modal>
    </Container>
  );
}
export default Produtos;
