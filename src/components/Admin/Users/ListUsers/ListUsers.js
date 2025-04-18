import React, {useState, useEffect} from 'react'
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { Loader } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { UserItem } from '../UserItem/UserItem';

const userController = new User();

export function ListUsers(props) {
    const {userActive, reload,  onReload} = props;
    const [users, setUsers] = useState(null);
    const {accessToken} = useAuth();

    useEffect(() => {
      (async () => {
        try {
            setUsers(null);
            const { data } = await userController.getUsers(accessToken, userActive);
            setUsers(data);
            
        } catch (error) {
            console.error(error);
        }
      })();
    }, [userActive, reload, accessToken]);

    if(!users) return <Loader active inline="centered"/>
    if(size(users) === 0) return "No se han encontrado usuarios"
    

  return map(users, (user)=> <UserItem key={user.usu_id} user={user} onReload={onReload}/>)
}
