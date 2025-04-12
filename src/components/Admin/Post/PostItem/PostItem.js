import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import "./PostItem.scss";
import { PostForm } from "../PostForm";
import { ListImagesSelectable } from "../ListImagesSelectable/ListImagesSelectable";
import { ListDocumentSelectable } from "../ListDocumentSelectable";
import { toast } from "react-toastify";

const postController = new Post();

export function PostItem(props) {
    const { post, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [showImagesModal, setShowImagesModal] = useState(false);

    const { accessToken } = useAuth();

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
    const onOpenCloseDocumentsModal = () => setShowDocumentsModal((prev) => !prev);
    const onOpenCloseImagesModal = () => setShowImagesModal((prev) => !prev);

    const onDelete = async () => {
        try {
            const response = await postController.deletePost(accessToken, post.pos_id);

            if (response.status === 200) {
                toast.success("Noticia eliminada exitosamente", { theme: "colored" });
                onReload();
                onOpenCloseConfirm();
            } else if (response.status === 400) {
                toast.warning(response.data?.msg || "Error en los datos de la solicitud", { theme: "colored" });
            } else if (response.status === 404) {
                toast.warning(response.data?.msg || "Noticia no encontrada", { theme: "colored" });
            } else if (response.status === 500) {
                toast.error("Error en el servidor al eliminar la noticia", { theme: "colored" });
            } else {
                toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error inesperado al eliminar la noticia", { theme: "colored" });
        }
    };


    return (
        <>
            <div className="post-item">
                <div className="post-item__info">
                <span className="post-item__info-title">{post.pos_titulo}</span>
                <span className="post-item__info-path">{post.pos_path}</span>
                </div>

                <div>
                <Button as={Link} primary icon to={`/blog/${post.pos_path}`} target="_blank">
                    <Icon name="eye" />
                </Button>
                <Button icon color="green" onClick={onOpenCloseDocumentsModal}>
                    <Icon name="file pdf outline" />
                </Button>
                <Button icon color="pink" onClick={onOpenCloseImagesModal}>
                    <Icon name="image" />
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
                title="Editar Noticia"
                size="large"
            >
                <PostForm onClose={onOpenCloseModal} onReload={onReload} post={post} />
            </BasicModal>

            <BasicModal
                show={showDocumentsModal}
                close={onOpenCloseDocumentsModal}
                title="Agregar Documentos a la noticia"
            >
                <ListDocumentSelectable active={true} onClose={onOpenCloseDocumentsModal} reload={false} onReload={onReload} post={post} />
            </BasicModal>

            <BasicModal
                show={showImagesModal}
                close={onOpenCloseImagesModal}
                title="Agregar Imágenes a la noticia"
            >
                <ListImagesSelectable active={true} onClose={onOpenCloseImagesModal} reload={false} onReload={onReload} post={post} />
            </BasicModal>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`¿Eliminar Noticia: ${post.pos_titulo}?`}
                size="mini"
            />
        </>
    );
}