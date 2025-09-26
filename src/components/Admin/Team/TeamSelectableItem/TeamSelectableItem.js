import React from "react";
import { Checkbox } from "semantic-ui-react";
import "./TeamSelectableItem.scss"

export function TeamSelectableItem(props) {
    const { team, onSelect, isSelected } = props;

    const handleCheckboxChange = (e, { checked }) => {
        onSelect(team.equ_id, checked);
    };

    return (
        <div className="team-selectable-item">
            <label className="team-item__label">
                <Checkbox
                checked={isSelected}
                onChange={handleCheckboxChange}
                className="team-selectable-item__checkbox"
                />
                
                <span className="team-selectable-item__title">{team.equ_nombre}</span>
                
            </label>
        </div>
    );
}