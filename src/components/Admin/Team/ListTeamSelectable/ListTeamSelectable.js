import React, { useEffect, useState } from 'react';
import { map, size } from 'lodash';
import { Loader, Pagination, Button } from 'semantic-ui-react';
import { Team } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { toast } from 'react-toastify';
import { TeamSelectableItem } from '../TeamSelectableItem';

const teamController = new Team();

export function ListTeamSelectable(props) {
    const { active, reload, onReload, onClose, initialSelected = [], onSave } = props;
    const [teams, setTeams] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedTeams, setSelectedTeams] = useState(new Set()); // Set to track selected documents

    const { accessToken } = useAuth();

    // cargar las imagenes
    useEffect(() => {
        (async () => {
        try {
            setTeams(null);
            const {data} = await teamController.getTeams(page, 10);
            setTeams(data.teams);
            setPagination({
            limit: data.limit,
            page: data.page,
            pages: data.totalPages,
            total: data.total,
            });
        } catch (error) {
            console.error(error);
        }
        })();
    }, [active, reload, page]);

    useEffect(() => {
        if (initialSelected.length > 0) {
            setSelectedTeams(new Set(initialSelected));
        }
    }, [initialSelected]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    };

    const toggleSelection = (gimId) => {
        setSelectedTeams((prev) => {
        const newSelection = new Set(prev);
        if (newSelection.has(gimId)) {
            newSelection.delete(gimId);
        } else {
            newSelection.add(gimId);
        }
        return newSelection;
        });
    };

    const handleAddTeams = async () => {
        try {
            const selectedDocsArray = Array.from(selectedTeams);

            // delegamos la lógica a la prop que venga desde el padre
            await onSave(selectedDocsArray, accessToken);

            toast.success("Equipos agregados correctamente", { theme: "colored" });
            onReload();
            onClose();
        } catch (error) {
            console.error('Error al agregar equipos:', error);
            toast.error("Error inesperado al agregar los equipos", { theme: "colored" });
        }
    };
    

    if (!teams) return <Loader active inline="centered" />;
    if (size(teams) === 0) return 'No se han encontrado imágenes';

    return (
        <div className="list-teams-selectable">

        {/* teams list */}
        <div className="list-teams-selectable__items">
            {map(teams, (item) => (
            <div key={item.equ_id} className="list-teams-selectable__item">
                <TeamSelectableItem 
                    team={item} 
                    isSelected={selectedTeams.has(item.equ_id)}
                    onSelect={toggleSelection}/>
            </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="list-teams-selectable__pagination">
            <Pagination
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
            />
        </div>

        <hr/>

        {/* Add Documents Button */}
        <div className="list-teams-selectable__add-button">
            <Button
                primary
                fluid
                onClick={handleAddTeams}
            >
                Agregar
            </Button>
        </div>

        </div>
    );
}
