import React, { useState } from 'react'
import { Button, Tab } from 'semantic-ui-react';
import { BasicModal } from "../../../components/Shared";
import { ListImageGallery } from '../../../components/Admin/ImageGallery/ListImageGallery/ListImageGallery';
import "./ImageGallery.scss"
import { ImageGalleryForm } from '../../../components/Admin/ImageGallery/ImageGalleryForm/ImageGalleryForm';

export function ImageGallery() {
   const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListImageGallery reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="blog-page">
        <Button className="blog-page__add" primary onClick={onOpenCloseModal}>
          Nueva Imagen
        </Button>
        
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nueva Imágen"
        size="large">
        
        <ImageGalleryForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
