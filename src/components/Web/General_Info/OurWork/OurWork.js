import React, { useEffect, useState } from "react";
import "./OurWork.scss";
import { GeneralInfo } from "../../../../api";
import { Loader } from "semantic-ui-react";

const generalInfoController = new GeneralInfo();

export function OurWork() {

    const [generalInfo, setGeneralInfo] = useState(null);

    useEffect(() => {
        (async () => {
        try {
            const response = await generalInfoController.getGeneralInfo();
            setGeneralInfo(response);
        } catch (error) {
            console.error(error);
        }
        })();
    }, []);

    if (!generalInfo) return <Loader active inline="centered" />;



    return (
        <section className="ourwork-section">
            <div className="container">
                <h2 className="ourwork-section__title">NUESTRO TRABAJO</h2>
                <p className="description">
                    {generalInfo[0]?.ing_nuestro_trabajo}
                </p>

                <div className="additional-content">
                    <div className="box">
                        <h5>DIFUSIÓN</h5>
                        <p>{generalInfo[0]?.ing_nuestro_trabajo_difusion}</p>
                    </div>
                    <div className="box grey-background">
                        <h5>FORMACIÓN</h5>
                        <p>{generalInfo[0]?.ing_nuestro_trabajo_formacion}</p>
                    </div>
                    <div className="box">
                        <h5>INVESTIGACIÓN</h5>
                        <p>{generalInfo[0]?.ing_nuestro_trabajo_investigacion}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
