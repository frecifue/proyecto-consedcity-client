import React from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import "./DocumentPostItem.scss";
import { Link } from "react-router-dom";
import { ENV } from "../../../../utils";

export function DocumentPostItem(props) {
  const { document, onSelect, isSelected } = props;

  const handleCheckboxChange = (e, { checked }) => {
    onSelect(document.doc_id, checked);
  };

  return (
    <div className="document-post-item">
      <Checkbox
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="document-post-item__checkbox"
      />

      <div className="document-post-item__content">
        <div className="document-post-item__text">
          <span className="document-post-item__title">{document.doc_titulo}</span>
          <span className="document-post-item__description">{document.doc_descripcion}</span>
        </div>

        <Button
          as={Link}
          primary
          icon
          to={`${ENV.BASE_PATH}/${document.doc_documento}`}
          target="_blank"
        >
          <Icon name="eye" />
        </Button>
      </div>
    </div>
  );
}