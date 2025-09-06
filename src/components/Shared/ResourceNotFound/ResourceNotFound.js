// ResourceNotFound.js
import React from "react";
import { Link } from "react-router-dom";
import "./ResourceNotFound.scss";

export function ResourceNotFound({ title, message, linkTo, linkText }) {
    return (
        <div className="resource-not-found">
            <h2>{title}</h2>
            <p>{message}</p>
            {linkTo && <Link to={linkTo}>{linkText || "Volver"}</Link>}
        </div>
    );
}
