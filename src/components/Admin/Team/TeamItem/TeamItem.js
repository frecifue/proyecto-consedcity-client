import React, {useState} from 'react'
import { Image, Button, Icon, Confirm } from 'semantic-ui-react'; 
import { image } from '../../../../assets';
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../Shared';
import { Team } from '../../../../api';
import {useAuth} from "../../../../hooks"
import { TeamForm } from '../TeamForm';
import "./TeamItem.scss"
import { toast } from 'react-toastify';

const teamController = new Team();

export function TeamItem(props) {
    const {team, onReload} = props;
    const {accessToken} = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdatedTeam = () => {
        setTitleModal(`Actualizar equipo: ${team.equ_nombre}`)
        onOpenCloseModal();
    }

    const openDeleteconfirm = () =>{
        setConfirmMsg(`Eliminar equipo ${team.equ_nombre}`)
        onOpenCloseConfirm();
    }

    const onDelete = async () => {
        try {
            const response = await teamController.deleteTeam(accessToken, team.equ_id);
    
            if (response.status === 200) {
                toast.success("Equipo eliminado exitosamente", { theme: "colored" });
                onReload();
                onOpenCloseConfirm();
            } else if (response.status === 400) {
                toast.warning(response.data?.msg || "Error en los datos de la solicitud", { theme: "colored" });
            } else if (response.status === 404) {
                toast.warning(response.data?.msg || "Equipo no encontrado", { theme: "colored" });
            } else if (response.status === 500) {
                toast.error("Error en el servidor al eliminar el equipo", { theme: "colored" });
            } else {
                toast.error("Ha ocurrido un error inesperado", { theme: "colored" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error inesperado al eliminar el equipo", { theme: "colored" });
        }
    }
    

    return (
        <>
            <div className='team-item'> 
                <div className='team-item__info'>
                    <Image avatar src={team.equ_foto_perfil ? `${ENV.BASE_PATH}/${team.equ_foto_perfil}` : image.noAvatar} />
                    <div>
                        <p>{team.equ_nombre}</p>
                    </div>
                </div>
                <div >
                    <Button icon color="yellow" onClick={openUpdatedTeam}>
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
                title={titleModal}>
                <TeamForm close={onOpenCloseModal} team={team} onReload={onReload}/>
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
