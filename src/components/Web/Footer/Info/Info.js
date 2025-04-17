import React from "react";
import { Icon } from "../../../../assets";
import "./Info.scss";

export function Info() {
    return (
        <div className="footer-info">
            <img src={Icon.LogoColor} alt="Logo" className="logo-footer" />
            <p>
                CONSEDCITY | Todos los derechos reservados <br/> 2025
            </p>
        </div>
    );
}