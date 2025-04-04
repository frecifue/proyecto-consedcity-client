import React, {useState} from 'react'
import { Image, Button, Icon, Confirm } from 'semantic-ui-react'; 
import { image } from '../../../../assets';
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../Shared';
// import { UserForm } from '../UserForm/UserForm';
import { ImageGallery } from '../../../../api'; 
import {useAuth} from "../../../../hooks"
import "./ImageGalleryItem.scss";
import { ImageGalleryForm } from '../ImageGalleryForm/ImageGalleryForm';

const imgGalleryController = new ImageGallery();

export function ImageGalleryItem(props) {
    const {imgGallery, onReload} = props;
    const {accessToken} = useAuth();
// console.log(imgGallery)
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdatedUser = () => {
        setTitleModal(`Actualizar imágen: ${imgGallery.gim_nombre}`)
        onOpenCloseModal();
    }

    const openDeleteconfirm = () =>{
        setIsDelete(true);
        setConfirmMsg(`Eliminar imágen ${imgGallery.gim_nombre}`)
        onOpenCloseConfirm();
    }

    const onDelete = async () =>{
        try {
            await imgGalleryController.deleteImageGallery(accessToken, imgGallery.gim_id)
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='img-gallery-item'> 
                <div className='img-gallery-item__info'>
                    <Image avatar src={imgGallery.gim_imagen ? `${ENV.BASE_PATH}/${imgGallery.gim_imagen}` : image.noAvatar} />
                    <div>
                        <p>{imgGallery.gim_nombre}</p>
                    </div>
                </div>
                <div >
                    <Button icon color="yellow" onClick={openUpdatedUser}>
                        <Icon name='pencil'/>
                    </Button>

                    <Button icon color="red" onClick={openDeleteconfirm}>
                        <Icon name="trash"/>
                    </Button>
                </div>
            </div>

            <BasicModal
                show={showModal}
                close={onOpenCloseModal}
                title={titleModal}
                size="large">
                <ImageGalleryForm onClose={onOpenCloseModal} imgGallery={imgGallery} onReload={onReload}/>
            </BasicModal>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={confirmMsg}
                size="mini"
            />
            
        </>
    )
}
