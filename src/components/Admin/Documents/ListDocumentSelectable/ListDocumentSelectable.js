import React, { useEffect, useState } from 'react';
import { map, size } from 'lodash';
import { Loader, Pagination, Button } from 'semantic-ui-react';
import { Documents, Post } from '../../../../api';
import { DocumentPostItem } from '../DocumentPostItem/DocumentPostItem';
import './ListDocumentSelectable.scss';
import { useAuth } from '../../../../hooks';

const documentController = new Documents();
const postController = new Post();

export function ListDocumentSelectable(props) {
  const { active, reload, onReload, onClose, post } = props;
  const [documents, setDocuments] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedDocuments, setSelectedDocuments] = useState(new Set()); // Set to track selected documents

  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setDocuments(null);
        const response = await documentController.getDocuments(page, 2);
        setDocuments(response.documents);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.totalPages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [active, reload, page]);

  useEffect(() => {
    // Si hay documentos asociados al post, marcarlos como seleccionados
    if (post.documentos && post.documentos.length > 0) {
      const associatedDocuments = post.documentos.map(doc => doc.doc_id);
      // console.log(associatedDocuments);
      
      // si post viene con el array documentos, recorreremos los documentos y tomaremos el doc_id
      // luego, lo enviamos al setSelectedDocuments
      setSelectedDocuments(new Set(associatedDocuments));
    }
  }, [post.documentos]);

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
      // Convertimos el Set de documentos seleccionados a un array
      const selectedDocsArray = Array.from(selectedDocuments);

      const data = {
        documentsIds : selectedDocsArray
      }
      
      // Llamamos a la API para agregar los documentos seleccionados al post
      const response = await postController.addDocuments(accessToken, post.pos_id, data);
      
      console.log('Documentos agregados:', response);
      onReload();
      onClose();
      // Aquí puedes hacer algo con la respuesta, como cerrar el modal o recargar los datos
    } catch (error) {
      console.error('Error al agregar documentos:', error);
    }
  };

  // const handleSelectAll = () => {
  //   if (selectedDocuments.size === documents.length) {
  //     setSelectedDocuments(new Set()); // Deselect all if all are selected
  //   } else {
  //     const allDocs = new Set(documents.map((doc) => doc.doc_id));
  //     setSelectedDocuments(allDocs); // Select all documents
  //   }
  // };

  if (!documents) return <Loader active inline="centered" />;
  if (size(documents) === 0) return 'No se han encontrado documentos';

  return (
    <div className="list-documents-selectable">
      {/* Header with Select All checkbox */}
      {/* <div className="list-documents-selectable__header">
        <Checkbox
          checked={selectedDocuments.size === documents.length}
          onChange={handleSelectAll}
          label="Seleccionar todos"
        />
      </div> */}

      {/* Document list */}
      <div className="list-documents-selectable__items">
        {map(documents, (item) => (
          <div key={item.doc_id} className="list-documents-selectable__item">
            {/* <Checkbox
              checked={selectedDocuments.has(item.doc_id)}
              onChange={() => toggleSelection(item.doc_id)}
              label={item.doc_titulo}
            /> */}
            <DocumentPostItem 
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
          disabled={selectedDocuments.size === 0} // Disable button if no document is selected
        >
          Agregar
        </Button>
      </div>

    </div>
  );
}
