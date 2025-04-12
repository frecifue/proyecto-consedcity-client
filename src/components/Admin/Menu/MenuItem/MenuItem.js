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
            const nuevoEstado = !menu.men_activo;
            const response = await menuController.updateMenu(accessToken, menu.men_id, {
                activo: nuevoEstado
            });

            if (response.status === 200) {
                toast.success(
                    nuevoEstado ? "Menú activado correctamente" : "Menú desactivado correctamente",
                    { theme: "colored" }
                );
                onReload();
                onOpenCloseConfirm();
            } else if (response.status === 400) {
                toast.warning(response.data?.msg || "Error al actualizar Menú", { theme: "colored" });
            } else if (response.status === 404) {
                toast.warning(response.data?.msg || "Menú no encontrado", { theme: "colored" });
            } else if (response.status === 500) {
                toast.error("Error interno del servidor", { theme: "colored" });
            } else {
                toast.error("Ha ocurrido un problema al cambiar el estado del menú", { theme: "colored" });
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

    const onDelete = async () => {
        try {
            const response = await menuController.deleteMenu(accessToken, menu.men_id);

            if (response.status === 200) {
                toast.success("Menú eliminado exitosamente", { theme: "colored" });
                onReload();
                onOpenCloseConfirm();
            } else if (response.status === 400) {
                toast.warning(response.data?.msg || "Error al eliminar el menú", { theme: "colored" });
            } else if (response.status === 404) {
                toast.warning(response.data?.msg || "Menú no encontrado", { theme: "colored" });
            } else if (response.status === 500) {
                toast.error("Error interno del servidor", { theme: "colored" });
            } else {
                toast.error("Ha ocurrido un problema al eliminar el menú", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un problema al eliminar el menú", { theme: "colored" });
        }
    };

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
