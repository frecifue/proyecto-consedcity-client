import React from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import "./DocumentSelectableItem.scss";
import { Link } from "react-router-dom";
import { ENV } from "../../../../utils";

export function DocumentSelectableItem(props) {
  const { document, onSelect, isSelected } = props;

  const handleCheckboxChange = (e, { checked }) => {
    onSelect(document.doc_id, checked);
  };

  return (
    <div className="document-selectable-item">
      <label className="document-selectable-item__label">
        <Checkbox
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="document-selectable-item__checkbox"
        />

        <div className="document-selectable-item__text">
          <span className="document-selectable-item__title">{document.doc_titulo}</span>
          <span className="document-selectable-item__description">{document.doc_descripcion}</span>
        </div>
      </label>

      <div className="document-selectable-item__content">
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
