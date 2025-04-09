import React from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ENV } from "../../../../utils";
import "./ImagePostItem.scss"

export function ImagePostItem(props) {
  const { image, onSelect, isSelected } = props;

  const handleCheckboxChange = (e, { checked }) => {
    onSelect(image.gim_id, checked);
  };

  return (
    <div className="image-post-item">
      <Checkbox
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="image-post-item__checkbox"
      />

      <div className="image-post-item__content">
        <div className="image-post-item__text">
          <span className="image-post-item__title">{image.gim_nombre}</span>
        </div>

        <Button
          as={Link}
          primary
          icon
          to={`${ENV.BASE_PATH}/${image.gim_imagen}`}
          target="_blank"
        >
          <Icon name="eye" />
        </Button>
      </div>
    </div>
  );
}