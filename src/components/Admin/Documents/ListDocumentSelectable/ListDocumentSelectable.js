import React, { useEffect, useState } from 'react';
import { map, size } from 'lodash';
import { Loader, Pagination, Button } from 'semantic-ui-react';
import { Documents } from '../../../../api';
import './ListDocumentSelectable.scss';
import { useAuth } from '../../../../hooks';
import { toast } from 'react-toastify';
import { DocumentSelectableItem } from '../../Documents/DocumentSelectableItem/DocumentSelectableItem';

const documentController = new Documents();

export function ListDocumentSelectable(props) {
    const { active, reload, onReload, onClose, initialSelected = [], onSave } = props;
    const [documents, setDocuments] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedDocuments, setSelectedDocuments] = useState(new Set()); // Set to track selected documents

    const { accessToken } = useAuth();

    // Cargar documentos
    useEffect(() => {
        (async () => {
        try {
            setDocuments(null);
            const {data} = await documentController.getDocuments(page, 10);
            setDocuments(data.documents);
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

    // Inicializar documentos seleccionados si vienen de fuera
    useEffect(() => {
        if (initialSelected.length > 0) {
            setSelectedDocuments(new Set(initialSelected));
        }
    }, [initialSelected]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    };

    const toggleSelection = (docId) => {
        setSelectedDocuments((prev) => {
        const newSelection = new Set(prev);
        if (newSelection.has(docId)) {
            newSelection.delete(docId);
        } else {
            newSelection.add(docId);
        }
        return newSelection;
        });
    };

    const handleAddDocuments = async () => {
        try {
            const selectedDocsArray = Array.from(selectedDocuments);

            // delegamos la lógica a la prop que venga desde el padre
            await onSave(selectedDocsArray, accessToken);

            toast.success("Documentos agregados correctamente", { theme: "colored" });
            onReload();
            onClose();
        } catch (error) {
            console.error('Error al agregar documentos:', error);
            toast.error("Error inesperado al agregar los documentos", { theme: "colored" });
        }
    };
    


    if (!documents) return <Loader active inline="centered" />;
    if (size(documents) === 0) return 'No se han encontrado documentos';

    return (
        <div className="list-documents-selectable">

        {/* Document list */}
        <div className="list-documents-selectable__items">
            {map(documents, (item) => (
            <div key={item.doc_id} className="list-documents-selectable__item">
                <DocumentSelectableItem 
                document={item} 
                isSelected={selectedDocuments.has(item.doc_id)}
                onSelect={toggleSelection}/>
            </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="list-documents-selectable__pagination">
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
        <div className="list-documents-selectable__add-button">
            <Button
            primary
            fluid
            onClick={handleAddDocuments}
            >
            Agregar
            </Button>
        </div>

        </div>
    );
}
