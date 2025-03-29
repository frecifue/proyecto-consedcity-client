import React, {useState} from 'react'
import "./UserItem.scss";
import { Image, Button, Icon, Confirm } from 'semantic-ui-react'; 
import { image } from '../../../../assets';
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../Shared';
import { UserForm } from '../UserForm/UserForm';
import { User } from '../../../../api';
import {useAuth} from "../../../../hooks"


const userController = new User();

export function UserItem(props) {
    const {user, onReload} = props;
    const {accessToken} = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdatedUser = () => {
        setTitleModal(`Actualizar usuario: ${user.usu_email}`)
        onOpenCloseModal();
    }

    const openChangeStatusConfirm = () =>{
        setIsDelete(false);
        setConfirmMsg(user.usu_activo ? `Desactivar usuario: ${user.usu_email}` : `Activar usuario: ${user.usu_email}`)
        onOpenCloseConfirm();
    }

    const onChangeStatus = async ()=>{
        try {
            const nuevo = !user.usu_activo;

            await userController.updateUser(accessToken, user.usu_id, {
                activo: !user.usu_activo
            });
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const openDeleteconfirm = () =>{
        setIsDelete(true);
        setConfirmMsg(`Eliminar usuario ${user.usu_email}`)
        onOpenCloseConfirm();
    }

    const onDelete = async () =>{
        try {
            await userController.deleteUser(accessToken, user.usu_id)
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='user-item'> 
                <div className='user-item__info'>
                    <Image avatar src={user.usu_avatar ? `${ENV.BASE_PATH}/${user.usu_avatar}` : image.noAvatar} />
                    <div>
                        <p>{user.usu_nombres} {user.usu_primer_apellido}</p>
                        <p>{user.usu_rol}</p>
                        <p>{user.usu_email}</p>
                    </div>
                </div>
                <div >
                    <Button icon color="yellow" onClick={openUpdatedUser}>
                        <Icon name='pencil'/>
                    </Button>

                    <Button icon color={user.usu_activo ? "red" : "green"} onClick={openChangeStatusConfirm}>
                        <Icon name={user.usu_activo ? "ban" : "check"}/>
                    </Button>

                    <Button icon color="red" onClick={openDeleteconfirm}>
                        <Icon name="trash"/>
                    </Button>
                </div>
            </div>

            <BasicModal
                show={showModal}
                close={onOpenCloseModal}
                title={titleModal}>
                <UserForm close={onOpenCloseModal} user={user} onReload={onReload}/>
            </BasicModal>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={isDelete ? onDelete : onChangeStatus}
                content={confirmMsg}
                size="mini"
            />
            
        </>
    )
}
