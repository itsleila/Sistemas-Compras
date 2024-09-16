import React, { useEffect, useState } from 'react';
import { Container, DataTable, Modal } from '../../components';
import { listarUsuarios, atualizarUsuario } from './UserSettings';
import BlockIcon from '@mui/icons-material/Block';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Tooltip } from '@mui/material';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    const usuariosList = await listarUsuarios();
    setUsuarios(usuariosList);
  }

  const handleBloquear = async (usuario) => {
    if (usuario.id !== 'ij90UI06XNPiu9ec6iLlwTziRql1') {
      const novoStatus = !usuario.isBlocked;
      await atualizarUsuario(usuario.id, { isBlocked: novoStatus });
      setMensagem(
        `Usuário ${novoStatus ? 'bloqueado' : 'desbloqueado'} com sucesso.`,
      );
      setModalAberto(true);
      fetchUsuarios();
    } else {
      setMensagem('Você não pode bloquear o usuário padrão.');
      setModalAberto(true);
    }
  };

  const handleTornarAdmin = async (usuario) => {
    if (usuario.id !== 'ij90UI06XNPiu9ec6iLlwTziRql1') {
      const novoStatus = !usuario.isAdmin;
      await atualizarUsuario(usuario.id, { isAdmin: novoStatus });
      setMensagem(
        `Usuário ${
          novoStatus ? 'promovido a admin' : 'removido de admin'
        } com sucesso.`,
      );
      setModalAberto(true);
      fetchUsuarios();
    } else {
      setMensagem(
        'Você não pode modificar o status de admin do usuário padrão.',
      );
      setModalAberto(true);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMensagem('');
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Ações',
      cell: (row) => (
        <div>
          <Tooltip title={row.isAdmin ? 'Remover Admin' : 'Tornar Admin'}>
            <AdminPanelSettingsIcon
              style={{
                cursor: 'pointer',
                marginRight: '10px',
                fontSize: 30,
                fill: row.isAdmin ? 'gold' : 'black',
              }}
              onClick={() => handleTornarAdmin(row)}
            />
          </Tooltip>
          <Tooltip title={row.isBlocked ? 'Desbloquear' : 'Bloquear'}>
            <BlockIcon
              style={{
                cursor: 'pointer',
                fontSize: 30,
                fill: row.isBlocked ? 'red' : 'black',
              }}
              onClick={() => handleBloquear(row)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <div className="header-div">
        <div>
          <p className="painel-paragrafo">
            Lista com todos os usuários. Administradores podem tornar um
            colaborador em administrador ou bloquear um usuário.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={usuarios}
        pagination
        noDataComponent={'Nenhum usuário cadastrado ainda'}
      />

      <Modal open={modalAberto} onClose={fecharModal} title="Informação">
        <p>{mensagem}</p>
      </Modal>
    </Container>
  );
};

export default UserList;
