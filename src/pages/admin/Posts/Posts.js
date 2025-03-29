import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
// import "./Posts.scss";
// import { ListMenu, MenuForm } from "../../../components/Admin/Menu";
import { ListPost } from "../../../components/Admin/Post";

export function Posts() {
  return (
    <div>hola</div>
  )
  // const [showModal, setShowModal] = useState(false);
  // const [reload, setReload] = useState(false);

  // const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  // const onReload = () => setReload((prevState) => !prevState);

  // const panes = [
  //   {
  //     render: () => (
  //       <Tab.Pane attached={false}>
  //         <ListPost reload={reload} onReload={onReload}/>
  //       </Tab.Pane>
  //     ),
  //   },
  // ];

  // return (
  //   <>
  //     <div className="post-page">
  //       <Button className="post-page__add" primary onClick={onOpenCloseModal}>
  //         Nueva Noticia
  //       </Button>
        
  //       <Tab menu={{ secondary: true }} panes={panes} />
  //     </div>

  //     <BasicModal
  //       show={showModal}
  //       close={onOpenCloseModal}
  //       title="Crear nueva Noticia">
        
  //       {/* <MenuForm onClose={onOpenCloseModal} onReload={onReload} /> */}
  //     </BasicModal>
  //   </>
  // );
}