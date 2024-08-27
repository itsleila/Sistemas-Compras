import React, { useEffect, useState } from 'react';
import { Container, Modal } from '../../components';
import { DataTable } from '../../components';
import { excluirCotacao, listarCotacoes } from './Cotacoes';
import CotacoesForm from './CotacoesForm';
import CotacoesEdit from './CotacoesEdit';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

function Cotacoes({ isAdmin }) {
  const [cotacoes, setCotacoes] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedCotacao, setSelectedCotacao] = useState(null);

  useEffect(() => {
    fetchCotacoes();
  }, []);

  async function fetchCotacoes() {
    const cotacoesList = await listarCotacoes();
    setCotacoes(cotacoesList);
  }

  const handleOpenEditModal = (cotacao) => {
    setSelectedCotacao(cotacao);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedCotacao(null);
  };

  const handleOpenConfirmModal = (cotacao) => {
    setSelectedCotacao(cotacao);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedCotacao(null);
  };

  const handleDelete = async () => {
    if (selectedCotacao) {
      await excluirCotacao(selectedCotacao.id);
      fetchCotacoes();
      handleCloseConfirmModal();
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
              onClick={() => handleOpenEditModal(row)}
            />
          </Tooltip>

          <Tooltip
            title={
              isAdmin ? 'excluir' : 'Apenas adiminstradores podem modificar'
            }
          >
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              onClick={() => handleOpenConfirmModal(row)}
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
          open={editModalOpen}
          onClose={handleCloseEditModal}
          title="Editar Cotações"
        >
          {selectedCotacao && (
            <CotacoesEdit
              cotacao={selectedCotacao}
              onClose={handleCloseEditModal}
              onCotacaoUpdated={fetchCotacoes}
            />
          )}
        </Modal>
      )}
      {isAdmin && (
        <Modal
          open={confirmModalOpen}
          onClose={handleCloseConfirmModal}
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
