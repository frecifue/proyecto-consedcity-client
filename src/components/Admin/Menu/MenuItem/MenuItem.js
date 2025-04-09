import React, {useState} from 'react'
import "./MenuItem.scss";
import { Button, Icon, Confirm } from 'semantic-ui-react'; 
import { BasicModal } from '../../../Shared';
import { Menu } from '../../../../api';
import {useAuth} from "../../../../hooks"
import { MenuForm } from '../MenuForm';
import { toast } from 'react-toastify';


const menuController = new Menu();

export function MenuItem(props) {
    const {menu, onReload} = props;
    const {accessToken} = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdatedMenu = () => {
        setTitleModal(`Actualizar menú: ${menu.men_titulo}`)
        onOpenCloseModal();
    }

    const openChangeStatusConfirm = () =>{
        setIsDelete(false);
        setConfirmMsg(menu.men_activo ? `Desactivar menú: ${menu.men_titulo}` : `Activar menú: ${menu.men_titulo}`)
        onOpenCloseConfirm();
    }

    const onChangeStatus = async ()=>{
        try {
            const response = await menuController.updateMenu(accessToken, menu.men_id, {
                activo: !menu.men_activo
            });
console.log(response);

            if (response.status === 200) {
                toast.success("El menú ha cambiado de estado correctamente", {theme: "colored",});
                onReload();
                onOpenCloseConfirm();
            } else {
                throw new Error(); 
            }

        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un problema al cambiar el estado del menú", {theme: "colored",});
        }
    }

    const openDeleteconfirm = () =>{
        setIsDelete(true);
        setConfirmMsg(`Eliminar menú ${menu.men_titulo}`)
        onOpenCloseConfirm();
    }

    const onDelete = async () =>{
        try {
            await menuController.deleteMenu(accessToken, menu.men_id)
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='menu-item'> 
                <div className='menu-item__info'>
                    <span className='menu-item__info-title'>{menu.men_titulo}</span>
                    <span className='menu-item__info-path'>{menu.men_path}</span>
                </div>
                <div >
                    <Button icon color="yellow" onClick={openUpdatedMenu}>
                        <Icon name='pencil'/>
                    </Button>

                    <Button icon color={menu.men_activo ? "red" : "green"} onClick={openChangeStatusConfirm}>
                        <Icon name={menu.men_activo ? "ban" : "check"}/>
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
                <MenuForm onClose={onOpenCloseModal} menu={menu} onReload={onReload}/>
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
