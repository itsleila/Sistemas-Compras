import React, { useEffect, useState } from 'react';
import { Container } from '../../components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from '../../components';
import { listarFornecedores, excluirFornecedor } from './fornecedores';
import FornecedoresForm from './FornecedoresForm';
import FornecedoresEditar from './FornecedoresEditar';
import Modal from '../../components/Modal';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  useEffect(() => {
    fetchFornecedores();
  }, []);

  async function fetchFornecedores() {
    const fornecedoresList = await listarFornecedores();
    setFornecedores(fornecedoresList);
  }

  const handleOpenEditModal = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedFornecedor(null);
  };

  const handleOpenConfirmModal = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedFornecedor(null);
  };

  const handleDelete = async () => {
    if (selectedFornecedor) {
      await excluirFornecedor(selectedFornecedor.id);
      fetchFornecedores();
      handleCloseConfirmModal();
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

      <FornecedoresForm onFornecedorAdded={fetchFornecedores} />

      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        title="Editar Fornecedor"
      >
        {selectedFornecedor && (
          <FornecedoresEditar
            fornecedor={selectedFornecedor}
            onClose={handleCloseEditModal}
            onFornecedorUpdated={fetchFornecedores}
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
          Tem certeza que deseja excluir este fornecedor?
        </p>
      </Modal>
    </Container>
  );
}

export default Fornecedores;
