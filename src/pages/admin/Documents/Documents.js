import React, { useState } from 'react'
import { Button, Tab } from 'semantic-ui-react';
import { BasicModal } from "../../../components/Shared";
import { ListDocument } from '../../../components/Admin/Documents/ListDocument/ListDocument';
import "./Documents.scss"
import { DocumentForm } from '../../../components/Admin/Documents/DocumentForm/DocumentForm';

export function Documents() {
   const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListDocument reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="blog-page">
        <Button className="blog-page__add" primary onClick={onOpenCloseModal}>
          Nuevo Documento
        </Button>
        
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo Documento"
        size="large">
        
        <DocumentForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
