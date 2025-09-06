import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

export function NotFound({enableLink = true}) {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            {enableLink && <Link to="/">Volver al inicio</Link>}
        </div>
    );
}
