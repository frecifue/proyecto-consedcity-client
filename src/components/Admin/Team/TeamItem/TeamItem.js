import React, {useState} from 'react'
// import "./UserItem.scss";
import { Image, Button, Icon, Confirm } from 'semantic-ui-react'; 
import { image } from '../../../../assets';
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../Shared';
// import { UserForm } from '../UserForm/UserForm';
import { Team } from '../../../../api';
import {useAuth} from "../../../../hooks"
import { TeamForm } from '../TeamForm';
import "./TeamItem.scss"

const teamController = new Team();

export function TeamItem(props) {
    const {team, onReload} = props;
    const {accessToken} = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdatedTeam = () => {
        setTitleModal(`Actualizar equipo: ${team.equ_nombre}`)
        onOpenCloseModal();
    }

    const onChangeStatus = async ()=>{
        console.log('activar/desactivar no disponible')
    }

    const openDeleteconfirm = () =>{
        setIsDelete(true);
        setConfirmMsg(`Eliminar equipo ${team.equ_nombre}`)
        onOpenCloseConfirm();
    }

    const onDelete = async () =>{
        try {
            await teamController.deleteTeam(accessToken, team.equ_id)
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
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
                onConfirm={isDelete ? onDelete : onChangeStatus}
                content={confirmMsg}
                size="mini"
            />
            
        </>
    )
}
