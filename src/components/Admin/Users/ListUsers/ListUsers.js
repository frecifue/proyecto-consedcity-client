// ListUsers.jsx
import React, { useState, useEffect } from 'react';
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { UserForm } from '../UserForm/UserForm';
import { DynamicTable } from '../../../Shared/DynamicTable/DynamicTable';
import { ENV } from '../../../../utils';
import { image } from '../../../../assets';
import { toast } from 'react-toastify';

const userController = new User();

export function ListUsers({ userActive, reload, onReload }) {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);  // ← loading explícito

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);       // ← activa loading al inicio
        setUsers(null);
        const { data } = await userController.getUsers(accessToken, userActive);
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);      // ← siempre apaga loading
      }
    })();
  }, [userActive, reload, accessToken]);

  // --- Modal ---
  const openEditModal = (user) => {
    setSelectedUser(user);
    setTitleModal(`Actualizar usuario: ${user.usu_email}`);
    setShowModal(true);
  };

  // --- Confirm helpers ---
  const openToggleConfirm = (user) => {
    setTargetUser(user);
    setIsDelete(false);
    setConfirmMsg(
      user.usu_activo
        ? `¿Desactivar usuario ${user.usu_email}?`
        : `¿Activar usuario ${user.usu_email}?`
    );
    setShowConfirm(true);
  };

  const openDeleteConfirm = (user) => {
    setTargetUser(user);
    setIsDelete(true);
    setConfirmMsg(`¿Eliminar usuario ${user.usu_email}? Esta acción no se puede deshacer.`);
    setShowConfirm(true);
  };

  // --- Actions ---
  const onChangeStatus = async () => {
    try {
      const nuevoEstado = !targetUser.usu_activo;
      const response = await userController.updateUser(accessToken, targetUser.usu_id, {
        activo: nuevoEstado,
      });

      if (response.status === 200) {
        toast.success(
          nuevoEstado ? 'Usuario activado correctamente' : 'Usuario desactivado correctamente',
          { theme: 'colored' }
        );
        onReload();
        setShowConfirm(false);
      } else if (response.status === 400) {
        toast.warning(response.data?.msg || 'Error al cambiar estado del usuario', { theme: 'colored' });
      } else if (response.status === 404) {
        toast.warning(response.data?.msg || 'Usuario no encontrado', { theme: 'colored' });
      } else {
        toast.error('Error inesperado al cambiar estado', { theme: 'colored' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al intentar cambiar el estado del usuario', { theme: 'colored' });
    }
  };

  const onDelete = async () => {
    try {
      const response = await userController.deleteUser(accessToken, targetUser.usu_id);

      if (response.status === 200) {
        toast.success('Usuario eliminado correctamente', { theme: 'colored' });
        onReload();
        setShowConfirm(false);
      } else if (response.status === 404) {
        toast.warning('Usuario no encontrado', { theme: 'colored' });
      } else {
        toast.error('Error al eliminar el usuario', { theme: 'colored' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al intentar eliminar el usuario', { theme: 'colored' });
    }
  };

  // --- Columns ---
  const columns = [
    {
      key: 'usu_nombres',
      label: 'Usuario',
      sortable: true,
      render: (user) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            avatar
            src={user.usu_avatar ? `${ENV.BASE_PATH}/${user.usu_avatar}` : image.noAvatar}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>
              {user.usu_nombres} {user.usu_primer_apellido}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'usu_email',
      label: 'Email',
      sortable: true,
      render: (user) => (
        <p style={{ margin: 0, fontSize: '12px', color: 'gray' }}>
          {user.usu_email}
        </p>
      ),
    },
    {
      key: 'usu_rol',
      label: 'Rol',
      sortable: true,
      render: (user) => (
        <span
          style={{
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 500,
            background: '#e6f1fb',
            color: '#185fa5',
          }}
        >
          {user.tipo_usuario?.tus_nombre || 'Sin rol'}
        </span>
      ),
    },
    {
      key: 'usu_activo',
      label: 'Estado',
      sortable: true,
      render: (user) => (
        <span
          style={{
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 500,
            background: user.usu_activo ? '#eaf3de' : '#fcebeb',
            color: user.usu_activo ? '#3b6d11' : '#a32d2d',
          }}
        >
          {user.usu_activo ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (user) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button icon color="yellow" size="mini" onClick={() => openEditModal(user)}>
            <Icon name="pencil" />
          </Button>
          <Button icon color={user.usu_activo ? 'orange' : 'green'} size="mini" onClick={() => openToggleConfirm(user)}>
            <Icon name={user.usu_activo ? 'ban' : 'check'} />
          </Button>
          <Button icon color="red" size="mini" onClick={() => openDeleteConfirm(user)}>
            <Icon name="trash" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        data={users || []}      // ← nunca null
        loading={loading}       // ← loading explícito
        searchable
        searchKeys={['usu_nombres', 'usu_primer_apellido', 'usu_email']}
        emptyMessage="No se han encontrado usuarios"
        perPage={10}
        rowKey="usu_id"         // ← rowKey explícito
      />

      <BasicModal show={showModal} close={() => setShowModal(false)} title={titleModal}>
        <UserForm
          close={() => setShowModal(false)}
          user={selectedUser}
          onReload={onReload}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={isDelete ? onDelete : onChangeStatus}
        content={confirmMsg}
        size="mini"
      />
    </>
  );
}