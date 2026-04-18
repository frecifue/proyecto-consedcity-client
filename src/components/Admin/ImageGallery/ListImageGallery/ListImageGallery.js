// ListImageGallery.jsx
import React, { useState, useEffect } from 'react';
import { Image, Button, Icon, Label, Confirm } from 'semantic-ui-react';
import { ImageGallery } from '../../../../api';
import { BasicModal } from '../../../Shared';
import { ImageGalleryForm } from '../ImageGalleryForm/ImageGalleryForm';
import { DynamicTable } from '../../../Shared/DynamicTable/DynamicTable';
import { ENV } from '../../../../utils';
import { image } from '../../../../assets';
import { useAuth } from '../../../../hooks';
import { toast } from 'react-toastify';

const imgGalleryController = new ImageGallery();

const ITEMS_PER_PAGE = 10;

export function ListImageGallery({ active, reload, onReload }) {
  const { accessToken } = useAuth();
  const [imgGallery, setImgGallery] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  const [targetImg, setTargetImg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setImgGallery(null);
        const { data } = await imgGalleryController.getImagesGallery(page, ITEMS_PER_PAGE);
        setImgGallery(data.images);
        setPagination({
          page: data.page,
          pages: data.totalPages,
          total: data.total,
          limit: data.limit,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [active, reload, page]);  // ← page dispara nueva llamada al server

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // --- Modal ---
  const openEditModal = (img) => {
    setSelectedImg(img);
    setTitleModal(`Actualizar imagen: ${img.gim_nombre}`);
    setShowModal(true);
  };

  // --- Confirm ---
  const openDeleteConfirm = (img) => {
    setTargetImg(img);
    setConfirmMsg(`¿Eliminar imagen "${img.gim_nombre}"? Esta acción no se puede deshacer.`);
    setShowConfirm(true);
  };

  // --- Delete ---
  const onDelete = async () => {
    try {
      const response = await imgGalleryController.deleteImageGallery(accessToken, targetImg.gim_id);

      if (response.status === 200) {
        toast.success('Imagen eliminada exitosamente', { theme: 'colored' });
        onReload();
        setShowConfirm(false);
      } else if (response.status === 400) {
        toast.warning(response.data?.msg || 'Error al eliminar la imagen', { theme: 'colored' });
      } else if (response.status === 404) {
        toast.warning(response.data?.msg || 'Imagen no encontrada', { theme: 'colored' });
      } else if (response.status === 500) {
        toast.error('Error interno del servidor', { theme: 'colored' });
      } else {
        toast.error('Ha ocurrido un problema al eliminar la imagen', { theme: 'colored' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error inesperado al intentar eliminar la imagen', { theme: 'colored' });
    }
  };

  // --- Columns ---
  const columns = [
    {
      key: 'gim_imagen',
      label: 'Imagen',
      render: (img) => (
        <Image
          src={img.gim_imagen ? `${ENV.BASE_PATH}/${img.gim_imagen}` : image.noAvatar}
          avatar
        />
      ),
    },
    {
      key: 'gim_nombre',
      label: 'Nombre',
      sortable: true,
    },
    {
      key: 'gim_orden',
      label: 'Orden',
      sortable: true,
      render: (img) => (
        <Label circular color="orange">
          {img.gim_orden}
        </Label>
      ),
    },
    {
      key: 'gim_en_home',
      label: 'En Home',
      sortable: true,
      render: (img) =>
        img.gim_en_home ? (
          <Label circular color="green">Sí</Label>
        ) : (
          <span style={{ color: '#aaa', fontSize: '12px' }}>No</span>
        ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (img) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button icon color="yellow" size="mini" onClick={() => openEditModal(img)}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" size="mini" onClick={() => openDeleteConfirm(img)}>
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
        data={imgGallery || []}
        loading={loading}
        emptyMessage="No se han encontrado imágenes"
        serverPagination={pagination}
        onPageChange={handlePageChange}
        rowKey="gim_id"
      />

      <BasicModal
        show={showModal}
        close={() => setShowModal(false)}
        title={titleModal}
        size="large"
      >
        <ImageGalleryForm
          onClose={() => setShowModal(false)}
          imgGallery={selectedImg}
          onReload={onReload}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={onDelete}
        content={confirmMsg}
        size="mini"
      />
    </>
  );
}