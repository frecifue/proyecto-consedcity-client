import React, { useState } from 'react'
import { Button, Tab } from 'semantic-ui-react';
// import { ListPost, PostForm } from '../../../components/Admin/Post';
import { BasicModal } from "../../../components/Shared";
import "./Projects.scss"
import { ProjectForm } from '../../../components/Admin/Projects/ProjectForm';
import { ListProjects } from '../../../components/Admin/Projects';

export function Projects() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
        render: () => (
            <Tab.Pane attached={false}>
            <ListProjects reload={reload} onReload={onReload}/>
            </Tab.Pane>
        ),
        },
    ];

    return (
        <>
        <div className="project-page">
            <Button className="project-page__add" primary onClick={onOpenCloseModal}>
            Nuevo Proyecto
            </Button>
            
            <Tab menu={{ secondary: true }} panes={panes} />
        </div>

        <BasicModal
            show={showModal}
            close={onOpenCloseModal}
            title="Crear nuevo Proyecto"
            size="large">
            
            <ProjectForm onClose={onOpenCloseModal} onReload={onReload} />
        </BasicModal>
        </>
    );
}
