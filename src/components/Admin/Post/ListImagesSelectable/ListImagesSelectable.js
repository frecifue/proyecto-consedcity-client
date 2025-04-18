import React, { useEffect, useState } from 'react';
import { map, size } from 'lodash';
import { Loader, Pagination, Button } from 'semantic-ui-react';
import { ImageGallery, Post } from '../../../../api';
import { useAuth } from '../../../../hooks';
import './ListImagesSelectable.scss';
import { ImagePostItem } from '../ImagePostItem/ImagePostItem';
import { toast } from 'react-toastify';

const imgGalleryController = new ImageGallery();
const postController = new Post();

export function ListImagesSelectable(props) {
    const { active, reload, onReload, onClose, post } = props;
    const [images, setImages] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedImages, setSelectedImages] = useState(new Set()); // Set to track selected documents

    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
        try {
            setImages(null);
            const {data} = await imgGalleryController.getImagesGallery(page, 10);
            setImages(data.images);
            setPagination({
            limit: data.limit,
            page: data.page,
            pages: data.totalPages,
            total: data.total,
            });
        } catch (error) {
            console.error(error);
        }
        })();
    }, [active, reload, page]);

    useEffect(() => {
        // Si hay imagenes asociados al post, marcarlos como seleccionados
        if (post.imagenes && post.imagenes.length > 0) {
        const associatedImages = post.imagenes.map(gim => gim.gim_id);
        
        // si post viene con el array imagenes, recorreremos las imagenes y tomaremos el gim_id
        // luego, lo enviamos al setSelectedImages
        setSelectedImages(new Set(associatedImages));
        }
    }, [post.imagenes]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    };

    const toggleSelection = (gimId) => {
        setSelectedImages((prev) => {
        const newSelection = new Set(prev);
        if (newSelection.has(gimId)) {
            newSelection.delete(gimId);
        } else {
            newSelection.add(gimId);
        }
        return newSelection;
        });
    };

    const handleAddImages = async () => {
        try {
            // Convertimos el Set de imágenes seleccionadas a un array
            const selectedImgArray = Array.from(selectedImages);
    
            const data = {
                imagesIds: selectedImgArray
            }
    
            const response = await postController.addImages(accessToken, post.pos_id, data);
    
            if (response.status === 200) {
                toast.success("Imágenes agregadas correctamente", { theme: "colored" });
                onReload();
                onClose();
            } else if (response.status === 400) {
                toast.warning(response.data?.msg || "Error en los datos de las imágenes", { theme: "colored" });
            } else if (response.status === 404) {
                toast.warning(response.data?.msg || "Post no encontrado", { theme: "colored" });
            } else if (response.status === 500) {
                toast.error("Error al agregar las imágenes", { theme: "colored" });
            } else {
                toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
            }
            
        } catch (error) {
            console.error('Error al agregar imágenes:', error);
            toast.error("Error inesperado al agregar las imágenes", { theme: "colored" });
        }
    };
    

    if (!images) return <Loader active inline="centered" />;
    if (size(images) === 0) return 'No se han encontrado imágenes';

    return (
        <div className="list-images-selectable">

        {/* Images list */}
        <div className="list-images-selectable__items">
            {map(images, (item) => (
            <div key={item.gim_id} className="list-images-selectable__item">
                <ImagePostItem 
                image={item} 
                isSelected={selectedImages.has(item.gim_id)}
                onSelect={toggleSelection}/>
            </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="list-images-selectable__pagination">
            <Pagination
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
            />
        </div>

        <hr/>

        {/* Add Documents Button */}
        <div className="list-images-selectable__add-button">
            <Button
            primary
            fluid
            onClick={handleAddImages}
            >
            Agregar
            </Button>
        </div>

        </div>
    );
}
