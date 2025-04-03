import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { ListTeam } from "../../../components/Admin/Team/ListTeam/ListTeam";
import { TeamForm } from "../../../components/Admin/Team/TeamForm/TeamForm";
import "./Team.scss"

export function Team() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
     
      render: () => (
        <Tab.Pane attached={false}>
          <ListTeam active={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    }
  ];

  return (
    <>
      <div className="team-page">
        <Button className="team-page__add" primary onClick={onOpenCloseModal}>
          Nuevo Equipo
        </Button>
        
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo equipo">
        
        <TeamForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}