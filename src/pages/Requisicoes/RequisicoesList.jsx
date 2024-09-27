import React, { useEffect, useReducer, useState } from 'react';
import { Button, Container, Modal } from '../../components';
import { DataTable } from '../../components';
import RequisicoesForm from './RequisicoesForm';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CancelRounded from '@mui/icons-material/CancelRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import QueryBuilderRounded from '@mui/icons-material/QueryBuilderRounded';
import { RequisicoesCotacao, CadastrarCotacao } from './RequisicoesEdit';
import { excluirRequisicao, listarRequisicoes } from './Requisicoes';
import { listarCotacoes } from '../Cotacoes/Cotacoes';
import Tooltip from '@mui/material/Tooltip';
import { auth } from '../../infra/firebase';

const initialState = {
  requisicoes: [],
  abrirModalEdit: false,
  createModalOpen: false,
  abrirModalConfirm: false,
  cotacaoModalOpen: false,
  selectedRequisicao: null,
};

function reducer(estado, acao) {
  switch (acao.type) {
    case 'REQUISICOES':
      return { ...estado, requisicoes: acao.payload };
    case 'ABRIR_MODALEDIT':
      return {
        ...estado,
        abrirModalEdit: true,
        selectedRequisicao: acao.payload,
      };
    case 'FECHAR_MODALEDIT':
      return { ...estado, abrirModalEdit: false, selectedRequisicao: null };
    case 'ABRIR_CREATEMODAL':
      return {
        ...estado,
        createModalOpen: true,
        cotacaoModalOpen: true,
        selectedRequisicao: acao.payload,
      };
    case 'FECHAR_CREATEMODAL':
      return {
        ...estado,
        createModalOpen: false,
        cotacaoModalOpen: false,
        selectedRequisicao: null,
      };
    case 'ABRIR_MODALCONFIRM':
      return {
        ...estado,
        abrirModalConfirm: true,
        selectedRequisicao: acao.payload,
      };
    case 'FECHAR_MODALCONFIRM':
      return { ...estado, abrirModalConfirm: false, selectedRequisicao: null };
    default:
      return estado;
  }
}

function Requisicoes({ isAdmin }) {
  const [cotacoes, setCotacoes] = useState([]);
  const [aproveStates, setAproveStates] = useState({});
  const [estado, dispatch] = useReducer(reducer, initialState);
  const {
    requisicoes,
    abrirModalEdit,
    createModalOpen,
    abrirModalConfirm,
    selectedRequisicao,
    cotacaoModalOpen,
  } = estado;

  const fetchData = async () => {
    let requisicoesList = [];

    if (isAdmin) {
      requisicoesList = await listarRequisicoes();
    } else {
      const user = auth.currentUser;
      if (user) {
        requisicoesList = await listarRequisicoes(user.uid);
      } else {
        console.error('Usuário não autenticado.');
      }
    }

    const cotacoesList = await listarCotacoes();
    dispatch({ type: 'REQUISICOES', payload: requisicoesList });
    setCotacoes(cotacoesList);
  };

  useEffect(() => {
    fetchData();
    const storedAproveStates = localStorage.getItem('aproveStates');
    if (storedAproveStates) {
      setAproveStates(JSON.parse(storedAproveStates));
    }
  }, []);

  const handleCotacaoAdded = async () => {
    await fetchData();
  };

  const handleRequisicaoUpdated = async () => {
    await fetchData();
  };

  const handleAprove = (requisicao) => {
    const currentState = aproveStates[requisicao.id] || 'analise';
    if (!isAdmin) {
      return;
    }
    let newState;
    if (currentState === 'analise') {
      newState = 'aprovada';
    } else if (currentState === 'aprovada') {
      newState = 'reprovada';
    } else {
      newState = 'analise';
    }
    const updatedAproveStates = {
      ...aproveStates,
      [requisicao.id]: newState,
    };
    localStorage.setItem('aproveStates', JSON.stringify(updatedAproveStates));
    setAproveStates(updatedAproveStates);
  };

  const handleDelete = async () => {
    if (selectedRequisicao) {
      await excluirRequisicao(selectedRequisicao.id);
      dispatch({
        type: 'REQUISICOES',
        payload: requisicoes.filter((req) => req.id !== selectedRequisicao.id),
      });
      dispatch({ type: 'FECHAR_MODALCONFIRM' });
    }
  };

  const getStatus = (produto) => {
    const filteredCotacoes = cotacoes.filter(
      (cotacao) => cotacao.produto === produto,
    );
    const cotacoesCount = filteredCotacoes.length;

    if (cotacoesCount === 0) {
      return 'aguardando';
    } else if (cotacoesCount > 0 && cotacoesCount < 3) {
      return 'em andamento';
    } else {
      return 'finalizada';
    }
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconComponent
              style={{
                marginRight: '10px',
                fill:
                  currentState === 'aprovada'
                    ? 'green'
                    : currentState === 'reprovada'
                    ? 'red'
                    : 'black',
                cursor: 'pointer',
              }}
              onClick={() => handleAprove(row)}
            />
            {currentState === 'aprovada' && isAdmin && (
              <Button
                text="Abrir cotação"
                color="zinc95"
                variant="contained"
                size="small"
                sx={{ fontSize: 10 }}
                onClick={() =>
                  dispatch({ type: 'ABRIR_CREATEMODAL', payload: row })
                }
              />
            )}
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
      name: 'Data da Requisição',
      selector: (row) => row.data,
      format: (row) =>
        new Intl.DateTimeFormat('pt-BR').format(new Date(row.data)),
      sortable: true,
    },
    {
      name: 'Status da requisição',
      selector: (row) => getStatus(row.produto),
      sortable: true,
    },
    {
      name: 'Cotação',
      selector: (row) => (
        <div>
          <Button
            variant="text"
            text="Cotações"
            style={{ cursor: 'pointer', marginRight: '10px' }}
            color="zinc95"
            size="small"
            sx={{
              fontWeight: 400,
              '&:hover': {
                backgroundColor: 'none',
              },
              '&:focus': {
                outline: 'none',
              },
            }}
            onClick={() => dispatch({ type: 'ABRIR_MODALEDIT', payload: row })}
          />
        </div>
      ),
    },
    {
      name: 'Ações',
      cell: (row) => (
        <div>
          <Tooltip title="excluir">
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
          <h2 className="painel-title">Requisições</h2>
          <p className="painel-paragrafo">
            Lista com todas as requisições de compras já cadastradas.
          </p>
        </div>
      </div>

      <DataTable
        key={requisicoes.length}
        columns={columns}
        data={requisicoes}
        pagination
      />

      {!isAdmin && (
        <RequisicoesForm onRequisicaoAdded={handleRequisicaoUpdated} />
      )}

      <Modal
        open={abrirModalEdit}
        onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
        title="Cotações"
      >
        {selectedRequisicao && (
          <RequisicoesCotacao
            requisicao={selectedRequisicao}
            onClose={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
            onRequisicaoUpdated={fetchData}
          />
        )}
        <CloseIcon
          onClick={() => dispatch({ type: 'FECHAR_MODALEDIT' })}
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            cursor: 'pointer',
          }}
        />
      </Modal>

      {isAdmin && (
        <Modal
          open={createModalOpen}
          onClose={() => dispatch({ type: 'FECHAR_CREATEMODAL' })}
        >
          <>
            {selectedRequisicao && (
              <CadastrarCotacao
                produto={selectedRequisicao.produto}
                onCotacaoUpdated={handleCotacaoAdded}
                onRequisicaoUpdated={handleRequisicaoUpdated}
                requisicaoId={selectedRequisicao.id}
              />
            )}
          </>

          <CloseIcon
            onClick={() => dispatch({ type: 'FECHAR_CREATEMODAL' })}
            sx={{
              position: 'absolute',
              top: 15,
              right: 15,
              cursor: 'pointer',
            }}
          />
        </Modal>
      )}

      <Modal
        open={abrirModalConfirm}
        onClose={() => dispatch({ type: 'FECHAR_MODALCONFIRM' })}
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
