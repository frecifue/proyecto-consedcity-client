import React, { useState } from 'react'
import { Button, Tab } from 'semantic-ui-react';
import { ListPost, PostForm } from '../../../components/Admin/Post';
import { BasicModal } from "../../../components/Shared";
import "./Blog.scss"

export function Blog() {
   const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListPost reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="blog-page">
        <Button className="blog-page__add" primary onClick={onOpenCloseModal}>
          Nueva Noticia
        </Button>
        
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nueva Noticia"
        size="large">
        
        <PostForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
