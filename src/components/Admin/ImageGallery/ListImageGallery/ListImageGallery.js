import React, {useState, useEffect} from 'react'
import { Loader } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { ImageGallery } from '../../../../api'; 
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

const imgGalleryController = new ImageGallery();

export function ListImageGallery(props) {
    const {active, reload,  onReload} = props;
    const [imgGallery, setImgGallery] = useState(null);

    useEffect(() => {
      (async () => {
        try {
            setImgGallery(null);
            const {data} = await imgGalleryController.getImageGallery();
            setImgGallery(data);
            
        } catch (error) {
            console.error(error);
        }
      })();
    }, [active, reload]);

    if(!imgGallery) return <Loader active inline="centered"/>
    if(size(imgGallery) === 0) return "No se han encontrado imagenes"
    

  return map(imgGallery, (item)=> <ImageGalleryItem key={item.gim_id} imgGallery={item} onReload={onReload}/>)
}
