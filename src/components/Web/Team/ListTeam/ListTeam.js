// ListTeam.jsx
import React from "react";
import { map } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ENV } from "../../../../utils";

import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import "./ListTeam.scss";

export function ListTeam({ team }) {
    if (!team || team.length === 0) {
        return null;
    }

    return (
        <section className="carousel-container team-section" id="team-section">
            <h2 className="text-center team-title">EQUIPO PRINCIPAL</h2>

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
        </section>
    );
}
