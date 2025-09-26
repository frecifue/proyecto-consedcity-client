import React, {useState, useEffect} from 'react'
import { Team } from '../../../../api';
import { Loader, Pagination } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { TeamItem } from '../TeamItem';
import "./ListTeam.scss"

const teamController = new Team();

export function ListTeam(props) {
    const {active, reload,  onReload} = props;
    const [team, setTeam] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                setTeam(null);
                const {data} = await teamController.getTeams(page, 10);
                setTeam(data.teams);
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

    if(!team) return <Loader active inline="centered"/>
    if(size(team) === 0) return "No se han encontrado equipo"
        
    return (
        <div className='list-team'>
            {map(team, (item)=> <TeamItem key={item.equ_id} team={item} onReload={onReload}/>)}

            <div className='list-team__pagination'>
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
