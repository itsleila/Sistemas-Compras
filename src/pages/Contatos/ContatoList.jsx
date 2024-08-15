import React, { useState, useEffect } from 'react';
import { excluirContato, listarContatos } from './Contato';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContatoForm from './ContatoForm';
import ContatosEdit from './ContatosEdit';
import { Container, Modal } from '../../components';
import { DataTable } from '../../components';

function ContatoList() {
  const [contatos, setContatos] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedContato, setSelectedContato] = useState(null);

  useEffect(() => {
    fetchContatos();
  }, []);

  async function fetchContatos() {
    const contatosList = await listarContatos();
    setContatos(contatosList);
  }

  const handleOpenEditModal = (contato) => {
    setSelectedContato(contato);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = (contato) => {
    setEditModalOpen(false);
    setSelectedContato(null);
  };

  const handleOpenConfirmModal = (contato) => {
    setSelectedContato(contato);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedContato(null);
  };

  const handleDelete = async () => {
    if (selectedContato) {
      await excluirContato(selectedContato.id);
      fetchContatos();
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
          <h2 className="painel-title">Contato</h2>
          <p className="painel-paragrafo">
            Lista com todos os contatos já cadastrados.
          </p>
        </div>
      </div>

      <DataTable columns={columns} data={contatos} pagination />

      <ContatoForm onContatoAdded={fetchContatos} />

      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        title="Editar Contato"
      >
        {selectedContato && (
          <ContatosEdit
            contato={selectedContato}
            onClose={handleCloseEditModal}
            onContatoUpdated={fetchContatos}
          />
        )}
      </Modal>

      <Modal
        open={confirmModalOpen}
        onClose={handleCloseConfirmModal}
        title="Confirma Exclusão"
        onConfirm={handleDelete}
      >
        <p>Tem certeza que deseja excluir este contato?</p>
      </Modal>
    </Container>
  );
}
export default ContatoList;
