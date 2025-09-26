import React, { useEffect, useState } from 'react';
import { map, size } from 'lodash';
import { Loader, Pagination, Button } from 'semantic-ui-react';
import { ImageGallery } from '../../../../api';
import { useAuth } from '../../../../hooks';
import './ListImagesSelectable.scss';
import { ImagePostItem, ImageSelectableItem } from '../TeamSelectableItem/TeamSelectableItem';
import { toast } from 'react-toastify';

const imgGalleryController = new ImageGallery();

export function ListImagesSelectable(props) {
    const { active, reload, onReload, onClose, initialSelected = [], onSave } = props;
    const [images, setImages] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedImages, setSelectedImages] = useState(new Set()); // Set to track selected documents

    const { accessToken } = useAuth();

    // cargar las imagenes
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
        if (initialSelected.length > 0) {
            setSelectedImages(new Set(initialSelected));
        }
    }, [initialSelected]);

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
            const selectedDocsArray = Array.from(selectedImages);

            // delegamos la lógica a la prop que venga desde el padre
            await onSave(selectedDocsArray, accessToken);

            toast.success("Imágenes agregados correctamente", { theme: "colored" });
            onReload();
            onClose();
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
                <ImageSelectableItem 
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
