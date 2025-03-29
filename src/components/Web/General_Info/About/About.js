import React, { useEffect, useState } from 'react'
import { GeneralInfo } from "../../../../api";
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import "./About.scss"

const generalInfoController = new GeneralInfo();


export function About() {
  const [generalInfo, setGeneralInfo] = useState([]);
  
    useEffect(() => {
      (async () => {
        try {
          setGeneralInfo([]);
          const response = await generalInfoController.getGeneralInfo()
          setGeneralInfo(response);
          console.log(generalInfo)
        } catch (error) {
          console.error(error);
        }
      })();
    }, []);
  
    if (size(generalInfo) === 0) return "";
    if (!generalInfo) return <Loader active inline="centered" />;
  
    return (
      <section className="about-section">
        <div className="container">
          <div className="main-content">
            <h2 className="title">QUIENES SOMOS</h2>
            <p className="description">{generalInfo[0].ing_quienes_somos}</p>
          </div>

          <div className="additional-content">
            <div className="box">
              <h5>Misión</h5>
              <p>{generalInfo[0].ing_mision}</p>
            </div>
            <div className="box grey-background">
              <h5>Visión</h5>
              <p>{generalInfo[0].ing_vision}</p>
            </div>
          </div>
        </div>
      </section>
    );
}
