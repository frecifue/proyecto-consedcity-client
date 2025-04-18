import React, { useEffect, useState } from "react";
import { GeneralInfo } from "../../../../api";
import { Loader } from "semantic-ui-react";
import "./About.scss";

const generalInfoController = new GeneralInfo();

export function About() {
    const [generalInfo, setGeneralInfo] = useState(null);

    useEffect(() => {
        (async () => {
        try {
            const {data} = await generalInfoController.getGeneralInfo();
            setGeneralInfo(data);
        } catch (error) {
            console.error(error);
        }
        })();
    }, []);

    if (!generalInfo) return <Loader active inline="centered" />;
    
    return (
        <section className="about-section" id="about-section">
        <div className="container">
            <h2 className="about-section__title">QUIÉNES SOMOS</h2>
            <p className="description">{generalInfo[0]?.ing_quienes_somos}</p>

            <div className="additional-content">
            <div className="box">
                <h5>MISIÓN</h5>
                <p>{generalInfo[0]?.ing_mision}</p>
            </div>
            <div className="box grey-background">
                <h5>VISIÓN</h5>
                <p>{generalInfo[0]?.ing_vision}</p>
            </div>
            </div>
        </div>
        </section>
    );
}
