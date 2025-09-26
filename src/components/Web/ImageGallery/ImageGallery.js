import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";  
import "react-image-gallery/styles/css/image-gallery.css";
import "./ImageGallery.scss";
import { ENV } from "../../../utils";

export function ImageGallery({ images = [] }) {
    const [formattedImages, setFormattedImages] = useState([]);

    useEffect(() => {
        if (images.length > 0) {
            const items = images.map(img => ({
                original: `${ENV.BASE_PATH}/${img.gim_imagen}`,
                thumbnail: `${ENV.BASE_PATH}/${img.gim_imagen}`
            }));
            setFormattedImages(items);
        }
    }, [images]);

    if (!formattedImages || formattedImages.length === 0) return null;

    return (
        <section className="image-gallery-section" id="image-gallery-section">
            <h2 className="image-gallery-title">GALERÍA DE IMÁGENES</h2>
            <Gallery items={formattedImages} />
        </section>
    );
}
