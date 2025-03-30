import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";  // Importación por defecto
import "react-image-gallery/styles/css/image-gallery.css";
import { ImageGallery as ImageGalleryAPI } from "../../../api";  // Asegúrate de que la ruta sea correcta
import { ENV } from "../../../utils";
import "./ImageGallery.scss"

const imageGalleryController = new ImageGalleryAPI();

export function ImageGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await imageGalleryController.getImageGallery();
                const formattedImages = response.map((img) => ({
                    original: `${ENV.BASE_PATH}/${img.gim_imagen}`,
                    thumbnail: `${ENV.BASE_PATH}/${img.gim_imagen}`,
                }));
                setImages(formattedImages);
            } catch (error) {
                console.error("Error al cargar las imágenes:", error);
            }
        }

        fetchImages();
    }, []);

    return (
        <section className="image-gallery-section">
            <h2 className="text-center image-gallery-title">MOMENTOS CONSEDCITY</h2>
            <Gallery items={images} />
      </section>
    
);
}
