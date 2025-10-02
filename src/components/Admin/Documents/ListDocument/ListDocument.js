import React, { useEffect, useState } from 'react'
import { map, size } from 'lodash';
import { Loader, Pagination } from 'semantic-ui-react';
import "./ListDocument.scss"
import { Documents } from '../../../../api';
import { DocumentItem } from '../DocumentItem/DocumentItem';

const documentController = new Documents();

export function ListDocument(props) {
    const {active, reload,  onReload} = props;
    const [documents, setDocuments] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
      (async () => {
        try {
            setDocuments(null);
            const { data } = await documentController.getDocuments(page, 10);
            setDocuments(data.documents);
            setPagination({
              limit : data.limit,
              page: data.page,
              pages: data.totalPages,
              total: data.total,
            });
         
            
        } catch (error) {
            console.error(error);
        }
      })();
    }, [active, reload, page]);

    const changePage = (_, data) =>{
      setPage(data.activePage)
    }

    if(!documents) return <Loader active inline="centered"/>
    if(size(documents) === 0) return "No se han encontrado documentos"


  return (
    <div className='list-documents'>
      {map(documents, (item) => (
        <div key={item.doc_id} className="list-documents__item">
          <DocumentItem document={item} onReload={onReload} />
        </div>
      ))}

      <div className='list-documents__pagination'>
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
          />
      </div>

    </div>)
}
