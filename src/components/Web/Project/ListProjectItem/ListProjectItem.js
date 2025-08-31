import React from "react";
import { Link } from "react-router-dom";
import "./ListProjectItem.scss";

export function ListProjectItem({ project }) {
    return (
        <Link className="project-card" to={`/project/${project.pro_path}`}>
            <div className="project-card__content">
                <h3 className="project-card__title">{project.pro_nombre}</h3>
                <hr/>
                <p className="project-card__description">{project.pro_desc_corta}</p>
            </div>
        </Link>
    );
}
