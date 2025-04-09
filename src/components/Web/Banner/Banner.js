import React from "react";
import { Icon } from "../../../assets";
import "./Banner.scss";

export function Banner() {
  return (
    <div className="banner">
      <section className="banner__container">
        <img src={Icon.LogoBlanco} alt="Logo" className="logo" />
        <h1>
            ASOCIACIÓN GAMER
            <br/>
            CONSEDCITY
        </h1>
        <h2>
            Organización tecnológica y gamer con enfoque social de la región
            <br />
            del Biobío, Chile.
        </h2>
      </section>
    </div>
  );
}
