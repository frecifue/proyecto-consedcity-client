import React, { useState } from "react";
import { Button, Icon, Confirm, Label } from "semantic-ui-react";
import { Project } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import "./ProjectItem.scss";
import { toast } from "react-toastify";
import { ProjectForm } from "../ProjectForm";
import { ListDocumentSelectable } from "../../Documents";
import { ListImagesSelectable } from "../../ImageGallery";
import { ListTeamSelectable } from "../../Team/ListTeamSelectable/ListTeamSelectable";
import { ListPostSelectable } from "../../Post/ListPostSelectable/ListPostSelectable";
import { Link } from "react-router-dom";

const projectController = new Project();

export function ProjectItem(props) {
    const { project, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [showImagesModal, setShowImagesModal] = useState(false);
    const [showPostsModal, setShowPostsModal] = useState(false);
    const [showTeamsModal, setShowTeamsModal] = useState(false);

    const { accessToken } = useAuth();

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
    const onOpenCloseDocumentsModal = () => setShowDocumentsModal((prev) => !prev);
    const onOpenCloseImagesModal = () => setShowImagesModal((prev) => !prev);
    const onOpenClosePostsModal = () => setShowPostsModal((prev) => !prev);
    const onOpenCloseTeamsModal = () => setShowTeamsModal((prev) => !prev);

    const onDelete = async () => {
        try {
            const response = await projectController.deleteProject(accessToken, project.pro_id);

            if (response.status === 200) {
                toast.success("Proyecto eliminado exitosamente", { theme: "colored" });
                onReload();
                onOpenCloseConfirm();
            } else if (response.status === 400) {
                toast.warning(response.data?.msg || "Error en los datos de la solicitud", { theme: "colored" });
            } else if (response.status === 404) {
                toast.warning(response.data?.msg || "Proyecto no encontrada", { theme: "colored" });
            } else if (response.status === 500) {
                toast.error("Error en el servidor al eliminar el proyecto", { theme: "colored" });
            } else {
                toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error inesperado al eliminar el proyecto", { theme: "colored" });
        }
    };

    const onSaveDocuments = async (documentsIds, accessToken) => {
        const data = { documentsIds };
        const response = await projectController.addDocuments(accessToken, project.pro_id, data);

        if (response.status !== 200) {
            throw new Error(response.data?.msg || "Error al guardar documentos en Proyecto");
        }
    };

    const onSaveImages = async (imagesIds, accessToken) => {
        const data = { imagesIds };
        const response = await projectController.addImages(accessToken, project.pro_id, data);

        if (response.status !== 200) {
            throw new Error(response.data?.msg || "Error al guardar imagenes en Proyecto");
        }
    };

    const onSaveTeams = async (teamsIds, accessToken) => {
        const data = { teamsIds };
        const response = await projectController.addTeams(accessToken, project.pro_id, data);

        if (response.status !== 200) {
            throw new Error(response.data?.msg || "Error al guardar equipos en Proyecto");
        }
    };

    const onSavePosts = async (postsIds, accessToken) => {
        const data = { postsIds };
        const response = await projectController.addPosts(accessToken, project.pro_id, data);

        if (response.status !== 200) {
            throw new Error(response.data?.msg || "Error al guardar noticias en Proyecto");
        }
    };


    return (
        <>
            <div className="project-item">
                <div className="project-item__info">
                <span className="project-item__info-title">{project.pro_nombre}</span>
                <span className="project-item__info-anio">{project.pro_anio}</span>
                </div>

                <div>
                    <Label circular color="orange">{project.pro_orden}</Label>
                    <Button as={Link} primary icon to={`/project/${project.pro_path}`} target="_blank">
                        <Icon name="eye" />
                    </Button>
                    <Button icon color="green" onClick={onOpenCloseDocumentsModal}>
                        <Icon name="file pdf outline" />
                    </Button>
                    <Button icon color="pink" onClick={onOpenCloseImagesModal}>
                        <Icon name="image" />
                    </Button>
                    <Button icon color="blue" onClick={onOpenCloseTeamsModal}>
                        <Icon name="group" />
                    </Button>
                    <Button icon color="purple" onClick={onOpenClosePostsModal}>
                        <Icon name="list" />
                    </Button>
                    <Button icon color="yellow" onClick={onOpenCloseModal}>
                        <Icon name="pencil" />
                    </Button>
                    <Button icon color="red" onClick={onOpenCloseConfirm}>
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>

            <BasicModal
                show={showModal}
                close={onOpenCloseModal}
                title="Editar Proyecto"
                size="large"
            >
                <ProjectForm onClose={onOpenCloseModal} onReload={onReload} project={project} />
            </BasicModal>

            <BasicModal
                show={showDocumentsModal}
                close={onOpenCloseDocumentsModal}
                title="Agregar Documentos a la noticia"
            >
                <ListDocumentSelectable
                    active={true}
                    onClose={onOpenCloseDocumentsModal}
                    reload={false}
                    onReload={onReload}
                    initialSelected={project.documentos?.map(d => d.doc_id) || []}
                    onSave={onSaveDocuments}
                />
            </BasicModal>

            <BasicModal
                show={showImagesModal}
                close={onOpenCloseImagesModal}
                title="Agregar Imágenes al proyecto"
            >
                <ListImagesSelectable 
                    active={true} 
                    onClose={onOpenCloseImagesModal} 
                    reload={false} 
                    onReload={onReload} 
                    initialSelected={project.imagenes?.map(g => g.gim_id) || []}
                    onSave={onSaveImages}
                />
            </BasicModal>

            <BasicModal
                show={showTeamsModal}
                close={onOpenCloseTeamsModal}
                title="Agregar Equipos al proyecto"
            >
                <ListTeamSelectable 
                    active={true} 
                    onClose={onOpenCloseImagesModal} 
                    reload={false} 
                    onReload={onReload} 
                    initialSelected={project.equipos?.map(e => e.equ_id) || []}
                    onSave={onSaveTeams}
                />
            </BasicModal>

            <BasicModal
                show={showPostsModal}
                close={onOpenClosePostsModal}
                title="Agregar Noticias al proyecto"
            >
                <ListPostSelectable 
                    active={true} 
                    onClose={onOpenClosePostsModal} 
                    reload={false} 
                    onReload={onReload} 
                    initialSelected={project.posts?.map(p => p.pos_id) || []}
                    onSave={onSavePosts}
                />
            </BasicModal>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`¿Eliminar Proyecto: ${project.pro_nombre}?`}
                size="mini"
            />
        </>
    );
}