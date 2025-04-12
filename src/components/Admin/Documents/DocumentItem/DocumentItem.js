import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Documents } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { DocumentForm } from "../DocumentForm/DocumentForm";
import "./DocumentItem.scss"
import { ENV } from "../../../../utils";
import { toast } from "react-toastify";

const documentController = new Documents();

export function DocumentItem(props) {
  const { document, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
        const response = await documentController.deleteDocument(accessToken, document.doc_id);
        
        if (response.status === 200) {
            toast.success("Documento eliminado exitosamente", { theme: "colored" });
            onReload();
            onOpenCloseConfirm();
        } else if (response.status === 400) {
            toast.warning(response.data?.msg || "Error al eliminar el documento", { theme: "colored" });
        } else if (response.status === 404) {
            toast.warning(response.data?.msg || "Documento no encontrado", { theme: "colored" });
        } else if (response.status === 500) {
            toast.error("Error interno del servidor", { theme: "colored" });
        } else {
            toast.error("Ha ocurrido un problema al eliminar el documento", { theme: "colored" });
        }
    } catch (error) {
        console.error(error);
        toast.error("Ha ocurrido un problema al eliminar el documento", { theme: "colored" });
    }
  };


  return (
    <>
      <div className="post-item">
        <div className="post-item__info">
          <span className="post-item__info-title">{document.doc_titulo}</span>
          <span className="post-item__info-path">{document.doc_path}</span>
        </div>

        <div>
          <Button as={Link} primary icon to={`${ENV.BASE_PATH}/${document.doc_documento}`} target="_blank">
            <Icon name="eye" />
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
        title="Editar Documento"
        size="large"
      >
        <DocumentForm onClose={onOpenCloseModal} onReload={onReload} document={document} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Eliminar Documento: ${document.doc_titulo}?`}
        size="mini"
      />
    </>
  );
}