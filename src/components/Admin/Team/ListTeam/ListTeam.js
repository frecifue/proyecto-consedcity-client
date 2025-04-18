import React, {useState, useEffect} from 'react'
import { Team } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { Loader } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { TeamItem } from '../TeamItem';

const teamController = new Team();

export function ListTeam(props) {
    const {active, reload,  onReload} = props;
    const [team, setTeam] = useState(null);
    const {accessToken} = useAuth();

    useEffect(() => {
      (async () => {
        try {
            setTeam(null);
            const response = await teamController.getTeams(accessToken);
            setTeam(response.data);
            
        } catch (error) {
            console.error(error);
        }
      })();
    }, [active, reload, accessToken]);

    if(!team) return <Loader active inline="centered"/>
    if(size(team) === 0) return "No se han encontrado equipo"
    

  return map(team, (item)=> <TeamItem key={item.equ_id} team={item} onReload={onReload}/>)
}
