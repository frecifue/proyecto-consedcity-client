import { map, size } from 'lodash';
import React, { useEffect, useState } from 'react'
import {Menu} from "../../../../api"
import { Loader } from 'semantic-ui-react';
import { MenuItem } from '../MenuItem/MenuItem';

const menuController = new Menu();

export function ListMenu(props) {
    const {active, reload,  onReload} = props;
    const [menu, setMenu] = useState(null);

    useEffect(() => {
      (async () => {
        try {
            setMenu(null);
            const {data} = await menuController.getMenu(active);
            setMenu(data);
            
        } catch (error) {
            console.error(error);
        }
      })();
    }, [active, reload]);

    if(!menu) return <Loader active inline="centered"/>
    if(size(menu) === 0) return "No se han encontrado menus"


    return (
        map(menu, (menu) => (
          <MenuItem key={menu.men_id} menu={menu} onReload={onReload} />
        ))
    );
  
}
