import React, {useState, useEffect} from 'react'
import { Loader, Pagination } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { ImageGallery } from '../../../../api'; 
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import "./ListImageGallery.scss"

const imgGalleryController = new ImageGallery();

export function ListImageGallery(props) {
    const {active, reload,  onReload} = props;
    const [imgGallery, setImgGallery] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
      (async () => {
        try {
            setImgGallery(null);
            const {data} = await imgGalleryController.getImagesGallery(page, 10); 
            setImgGallery(data.images);
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

    if(!imgGallery) return <Loader active inline="centered"/>
    if(size(imgGallery) === 0) return "No se han encontrado imagenes"
    
    return (
        <div className='list-project'>
            {map(imgGallery, (item)=> <ImageGalleryItem key={item.pos_id} imgGallery={item} onReload={onReload}/>)}

            <div className='list-images__pagination'>
                <Pagination
                totalPages={pagination.pages}
                defaultActivePage={pagination.page}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                onPageChange={changePage}
                />
            </div>

        </div>
    )
}
