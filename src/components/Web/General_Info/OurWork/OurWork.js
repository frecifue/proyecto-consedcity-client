import React from 'react'
import "./OurWork.scss"

export function OurWork() {
    return (
        <section className="u-align-center u-clearfix u-section-6">
            <div className="u-clearfix u-sheet u-valign-middle">
                <h2 className="u-custom-font u-text">NUESTRO TRABAJO</h2>
                <h5 className="u-text">
                    Nuestro trabajo tiene como propósito visibilizar la comunidad gamer y generar un impacto a nivel de 
                    políticas públicas para potenciar la actividad gamer a nivel regional y nacional. 
                    Conoce nuestros componentes de acción que se dividen en Investigación, formación y difusión.
                </h5>
                <p className="u-text"></p>

                <div className="buttons-container">
                    <div className="u-container-style" /* onClick={() => openModal(data.cuadros_extras.cuadro_uno)} */>
                        <h5 className="u-align-center u-text">DIFUSIÓN</h5>
                    </div>
                    <div className="u-container-style" /* onClick={() => openModal(data.cuadros_extras.cuadro_dos)} */>
                        <h5 className="u-align-center u-text">FORMACIÓN</h5>
                    </div>
                    <div className="u-container-style" /* onClick={() => openModal(data.cuadros_extras.cuadro_tres)} */>
                        <h5 className="u-align-center u-text">INVESTIGACIÓN</h5>
                    </div>
                </div>

                {/* {modalOpen && <ModalTrabajo data={modalContent} onClose={() => setModalOpen(false)} />} */}
            </div>
        </section>
    );
}
