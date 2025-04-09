import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { map, size } from "lodash";
import { Team } from "../../../../api";
// import { TeamItem } from "../TeamItem";
import { Swiper, SwiperSlide } from "swiper/react"; // Importación correcta para Swiper
// import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper"; // Importa SwiperCore y los módulos necesarios

import "swiper/css"; // Estilos básicos
import "swiper/css/navigation"; // Estilos de navegación
import "swiper/css/pagination"; // Estilos de paginación

import "./ListTeam.scss"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ENV } from "../../../../utils";

// Inicializar los módulos en Swiper
// SwiperCore.use([Navigation, Pagination, Autoplay]);

const teamController = new Team();

export function ListTeam() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setTeam([]);
        const response = await teamController.getTeams();
        setTeam(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (size(team) === 0) return "";
  if (!team) return <Loader active inline="centered" />;

  return (
    <section className="carousel-container team-section" id="team-section">
      <h2 className="text-center team-title">EQUIPO CONSEDCITY</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Añadir los módulos aquí
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Avance automático cada 3s
        loop
        spaceBetween={50} // Agregar espacio entre los slides si lo deseas
        slidesPerView={1} // Mostrar un slide a la vez
      >
        {map(team, (item) => (
          <SwiperSlide key={item.equ_id} className="carousel-slide">
            <div className="slide-content">
              <div className="content-wrapper">
                <div className="info-box">
                  <p className="team-name">{item.equ_nombre}</p>
                  <p className="team-description">{item.equ_descripcion}</p>
                </div>
                <img 
                  src={`${ENV.BASE_PATH}/${item.equ_foto_perfil}`}
                  alt={item.titulo_socio} 
                  className="team-image" 
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
