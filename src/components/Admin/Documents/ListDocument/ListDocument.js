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
            const response = await documentController.getDocuments(page, 10);
            setDocuments(response.documents);
            setPagination({
              limit : response.limit,
              page: response.page,
              pages: response.totalPages,
              total: response.total,
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
      {map(documents, (item)=> <DocumentItem key={item.doc_id} document={item} onReload={onReload}/>)}

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
