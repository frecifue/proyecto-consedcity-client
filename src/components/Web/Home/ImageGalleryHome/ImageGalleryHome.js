import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";  // Importación por defecto
import "react-image-gallery/styles/css/image-gallery.css";
import { ImageGallery as ImageGalleryAPI } from "../../../../api";  // Asegúrate de que la ruta sea correcta
import { ENV } from "../../../../utils";
import "./ImageGalleryHome.scss"

const imageGalleryController = new ImageGalleryAPI();

export function ImageGalleryHome() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const {data} = await imageGalleryController.getImagesGallery(1, 10, true); 
                const formattedImages = data.images.map((img) => ({
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
        <section className="image-gallery-section" id="image-gallery-section">
            <h2 className="image-gallery-title">MOMENTOS CONSEDCITY</h2>
            <Gallery items={images} />
      </section>
    
    );
}
