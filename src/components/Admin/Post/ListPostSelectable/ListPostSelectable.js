import React, { useEffect, useState } from 'react';
import { map, size } from 'lodash';
import { Loader, Pagination, Button } from 'semantic-ui-react';
import { Post } from '../../../../api';
import { useAuth } from '../../../../hooks';
import './ListPostSelectable.scss';
import { PostSelectableItem } from '../PostSelectableItem/PostSelectableItem';
import { toast } from 'react-toastify';

const postController = new Post();

export function ListPostSelectable(props) {
    const { active, reload, onReload, onClose, initialSelected = [], onSave } = props;
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedPosts, setSelectedPosts] = useState(new Set()); // Set to track selected documents

    const { accessToken } = useAuth();

    // cargar las imagenes
    useEffect(() => {
        (async () => {
        try {
            setPosts(null);
            const {data} = await postController.getPosts(page, 10);
            setPosts(data.posts);
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
            setSelectedPosts(new Set(initialSelected));
        }
    }, [initialSelected]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    };

    const toggleSelection = (gimId) => {
        setSelectedPosts((prev) => {
        const newSelection = new Set(prev);
        if (newSelection.has(gimId)) {
            newSelection.delete(gimId);
        } else {
            newSelection.add(gimId);
        }
        return newSelection;
        });
    };

    const handleAddPosts = async () => {
        try {
            const selectedDocsArray = Array.from(selectedPosts);

            // delegamos la lógica a la prop que venga desde el padre
            await onSave(selectedDocsArray, accessToken);

            toast.success("Noticias agregados correctamente", { theme: "colored" });
            onReload();
            onClose();
        } catch (error) {
            console.error('Error al agregar noticias:', error);
            toast.error("Error inesperado al agregar las noticias", { theme: "colored" });
        }
    };
    

    if (!posts) return <Loader active inline="centered" />;
    if (size(posts) === 0) return 'No se han encontrado imágenes';

    return (
        <div className="list-post-selectable">
            {/* Post list */}
            <div className="list-post-selectable__items">
                {map(posts, (item) => (
                <div key={item.gim_id} className="list-post-selectable__item">
                    <PostSelectableItem 
                        post={item} 
                        isSelected={selectedPosts.has(item.pos_id)}
                        onSelect={toggleSelection}/>
                </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="list-post-selectable__pagination">
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
            <div className="list-post-selectable__add-button">
                <Button
                    primary
                    fluid
                    onClick={handleAddPosts}
                >
                Agregar
                </Button>
            </div>
        </div>
    );
}
