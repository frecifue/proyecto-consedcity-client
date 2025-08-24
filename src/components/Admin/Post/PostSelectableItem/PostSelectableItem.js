import React from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import "./PostSelectableItem.scss"
import { Link } from "react-router-dom";

export function PostSelectableItem(props) {
    const { post, onSelect, isSelected } = props;

    const handleCheckboxChange = (e, { checked }) => {
        onSelect(post.pos_id, checked);
    };

    return (
        <div className="post-selectable-item">
            <label className="post-selectable-item__label">
                <Checkbox
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    className="post-selectable-item__checkbox"
                />
        
                {/* <div className="post-selectable-item__text"> */}
                <span className="post-selectable-item__title">{post.pos_titulo}</span>
                {/* </div> */}

                <div className="image-post-item__content">
                    <Button
                        as={Link}
                        primary
                        icon
                        to={`/blog/${post.pos_path}`}
                        target="_blank"
                    >
                        <Icon name="eye" />
                    </Button>
                </div>
            </label>
        </div>
    );
      
}