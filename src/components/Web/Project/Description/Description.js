import React from "react";
import { Loader } from "semantic-ui-react";
import "./Description.scss"

export function Description({name, description}) {
    
    if (!description) return <Loader active inline="centered" />;
    
    return (
        <section className="project-section" id="project-section">
            <div className="container">
                <h2 className="project-section__title">{name}</h2>
                <p className="description">{description}</p>
            </div>
        </section>
    );
}
