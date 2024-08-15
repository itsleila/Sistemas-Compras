import React, { useEffect, useState } from 'react';
import { Container, Modal } from '../../components';
import { DataTable } from '../../components';
import RequisicoesForm from './RequisicoesForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelRounded from '@mui/icons-material/CancelRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import QueryBuilderRounded from '@mui/icons-material/QueryBuilderRounded';
import RequisicoesEdit from './RequisicoesEdit';
import { excluirRequisicao, listarRequisicoes } from './Requisicoes';

function Requisicoes() {
  const [requisicoes, setRequisicoes] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedRequisicao, setSelectedRequisicao] = useState(null);
  const [aproveStates, setAproveStates] = useState({});

  useEffect(() => {
    fetchRequisicoes();
  }, []);

  async function fetchRequisicoes() {
    const requisicoesList = await listarRequisicoes();
    setRequisicoes(requisicoesList);
  }

  const handleOpenEditModal = (requisicao) => {
    setSelectedRequisicao(requisicao);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedRequisicao(null);
  };

  const handleOpenConfirmModal = (requisicao) => {
    setSelectedRequisicao(requisicao);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedRequisicao(null);
  };

  const handleDelete = async () => {
    if (selectedRequisicao) {
      await excluirRequisicao(selectedRequisicao.id);
      fetchRequisicoes();
      handleCloseConfirmModal();
    }
  };

  const handleAprove = (row) => {
    setAproveStates((prevState) => {
      const currentState = prevState[row.id] || 'analise';
      let nextState;
      if (currentState === 'analise') {
        nextState = 'aprovada';
      } else if (currentState === 'aprovada') {
        nextState = 'reprovada';
      } else {
        nextState = 'analise';
      }
      return {
        ...prevState,
        [row.id]: nextState,
      };
    });
  };

  const columns = [
    {
      name: 'Status da aprovação',
      cell: (row) => {
        const currentState = aproveStates[row.id] || 'analise';
        let IconComponent;

        if (currentState === 'aprovada') {
          IconComponent = CheckCircleRounded;
        } else if (currentState === 'reprovada') {
          IconComponent = CancelRounded;
        } else {
          IconComponent = QueryBuilderRounded;
        }

        return (
          <div onClick={() => handleAprove(row)} style={{ cursor: 'pointer' }}>
            <IconComponent style={{ marginRight: '10px' }} />
          </div>
        );
      },
    },
    {
      name: 'Produto',
      selector: (row) => row.produto,
      sortable: true,
    },
    {
      name: 'Status da requisição',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Fornecedor',
      selector: (row) => row.fornecedor,
      sortable: true,
    },
    {
      name: 'Cotação',
      selector: (row) => row.cotacao,
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
          <h2 className="painel-title">Requisições</h2>
          <p className="painel-paragrafo">
            Lista com todas as requisições de compras já cadastradas.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={requisicoes}
        pagination
        conditionalRowStyles={[
          {
            when: (row) => aproveStates[row.id] === 'aprovada',
            classNames: ['row-aprovada'],
          },
          {
            when: (row) => aproveStates[row.id] === 'reprovada',
            classNames: ['row-reprovada'],
          },
        ]}
      />

      <RequisicoesForm onRequisicaoAdded={fetchRequisicoes} />

      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        title="Editar Requisição"
      >
        {selectedRequisicao && (
          <RequisicoesEdit
            requisicao={selectedRequisicao}
            onClose={handleCloseEditModal}
            onRequisicaoUpdated={fetchRequisicoes}
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
          Tem certeza que deseja excluir esta requisição?
        </p>
      </Modal>
    </Container>
  );
}

export default Requisicoes;
