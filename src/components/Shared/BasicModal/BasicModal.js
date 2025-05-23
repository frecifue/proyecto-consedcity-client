import React from "react";
import { Modal } from "semantic-ui-react";
import "./BasicModal.scss"

export function BasicModal(props) {
    const { show, close, title, size, children } = props;

    return (
        <Modal closeIcon open={show} onClose={close} size={size} className="basic-modal">
            {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>{children}</Modal.Content>
        </Modal>
    );
}

BasicModal.defaultProps = {
    size: "tiny",
};