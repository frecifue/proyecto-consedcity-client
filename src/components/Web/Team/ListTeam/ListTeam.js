import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { map, size } from "lodash";
import { Team } from "../../../../api";
import { Swiper, SwiperSlide } from "swiper/react"; // Importación correcta para Swiper

import "swiper/css"; // Estilos básicos
import "swiper/css/navigation"; // Estilos de navegación
import "swiper/css/pagination"; // Estilos de paginación

import "./ListTeam.scss"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ENV } from "../../../../utils";

const teamController = new Team();

export function ListTeam() {
  const [team, setTeam] = useState([]);

    useEffect(() => {
        (async () => {
        try {
            setTeam([]);
            const { data } = await teamController.getTeams();
            setTeam(data);
        } catch (error) {
            console.error(error);
        }
        })();
    }, []);

    // if (team.length === 0) return <Loader active inline="centered" />;

    return (
        <section className="carousel-container team-section" id="team-section">
          <h2 className="text-center team-title">EQUIPO CONSEDCITY</h2>
      
          {team.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              spaceBetween={50}
              slidesPerView={1}
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
          ) : (
            <p className="text-center mt-5">Pronto conocerás a nuestro equipo 👀</p>
          )}
        </section>
    );      
}
