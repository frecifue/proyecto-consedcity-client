import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";  // Importación por defecto
import "react-image-gallery/styles/css/image-gallery.css";
import { ENV } from '../../../../utils'
import "./ImagesPost.scss"

export function ImagesPost(props) {
    const {post} = props
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const formattedImages = post.imagenes.map((img) => ({
                    original: `${ENV.BASE_PATH}/${img.gim_imagen}`,
                    thumbnail: `${ENV.BASE_PATH}/${img.gim_imagen}`,
                }));
                setImages(formattedImages);
            } catch (error) {
                console.error("Error al cargar las imágenes:", error);
            }
        }

        fetchImages();
    }, [post.imagenes]);

    return (
        <section className="image-post-section" id="image-post-section">
            <Gallery items={images} />
        </section>
    
    );
}
