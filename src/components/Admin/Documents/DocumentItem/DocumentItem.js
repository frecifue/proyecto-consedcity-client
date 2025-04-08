import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Documents } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { DocumentForm } from "../DocumentForm/DocumentForm";
import "./DocumentItem.scss"
import { ENV } from "../../../../utils";

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
      await documentController.deleteDocument(accessToken, document.doc_id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
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