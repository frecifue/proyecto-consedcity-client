import React from 'react'
import {Menu, Icon} from "semantic-ui-react"
import { Link, useLocation } from 'react-router-dom'
import "./AdminMenu.scss"
import {useAuth} from "../../../../hooks"

export function AdminMenu() {
  const {pathname} = useLocation();
  const {
    user: {usu_rol}
  } = useAuth();

  // console.log(usu_rol)

  const isAdmin = usu_rol === "admin";

  const isCurrentPath = (path) => {
    if(path === pathname) return true;
    return false;
  }

  // console.log(useAuth())

  return (
    <Menu fluid vertical icon text className='admin-menu'>
      {isAdmin && (
        <>
          <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
              <Icon name="user outline"/>
              Usuarios
          </Menu.Item>
          <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
              <Icon name="bars"/>
              Menu
          </Menu.Item>
          <Menu.Item as={Link} to="/admin/general_info" active={isCurrentPath("/admin/general_info")}>
              <Icon name="bars"/>
              Info General
          </Menu.Item>
          <Menu.Item as={Link} to="/admin/team" active={isCurrentPath("/admin/team")}>
              <Icon name="group"/>
              Equipo
          </Menu.Item>
        </>
      )}
  
      {/* <Menu.Item as={Link} to="/admin/post" active={isCurrentPath("/admin/post")}>
          <Icon name="bars"/>
          Noticias
      </Menu.Item> */}

      <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
          <Icon name="newspaper"/>
          Noticias
      </Menu.Item>
    </Menu>
  )
}
