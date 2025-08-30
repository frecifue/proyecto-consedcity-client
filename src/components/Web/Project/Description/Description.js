import React from "react";
// import { GeneralInfo } from "../../../../api";
import { Loader } from "semantic-ui-react";
// import "./About.scss";


export function Description({name, description}) {
    

    if (!description) return <Loader active inline="centered" />;
    
    return (
        <section className="about-section" id="about-section">
            <div className="container">
                <h2 className="about-section__title">{name}</h2>
                <p className="description">{description}</p>
            </div>
        </section>
    );
}
