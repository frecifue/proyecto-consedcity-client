import React from 'react'
import {Menu, Icon} from "semantic-ui-react"
import { Link, useLocation } from 'react-router-dom'
import "./AdminMenu.scss"
import {useAuth} from "../../../../hooks"

export function AdminMenu() {
    const { pathname } = useLocation();
    const {
        user: { tipo_usuario: { tus_id } }
    } = useAuth();

    const isCurrentPath = (path) => pathname === path;

    const isSuperAdmin = tus_id === 1;
    const isAdmin = tus_id === 2;
    const isColaborador = tus_id === 3;

    return (
        <Menu fluid vertical icon text className='admin-menu'>
            {(isSuperAdmin || isAdmin) && (
                <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                    <Icon name="user outline" />
                    Usuarios
                </Menu.Item>
            )}

            {isSuperAdmin && (
                <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
                    <Icon name="bars" />
                    Menu
                </Menu.Item>
            )}

            {(isSuperAdmin || isAdmin) && (
                <>
                    <Menu.Item as={Link} to="/admin/general_info" active={isCurrentPath("/admin/general_info")}>
                        <Icon name="bars" />
                        Info General
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/team" active={isCurrentPath("/admin/team")}>
                        <Icon name="group" />
                        Equipo
                    </Menu.Item>
                </>
            )}

            {(isSuperAdmin || isAdmin || isColaborador) && (
                <>
                    <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
                        <Icon name="newspaper" />
                        Noticias
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/image_gallery" active={isCurrentPath("/admin/image-gallery")}>
                        <Icon name="image" />
                        Galería de Imágenes
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/documents" active={isCurrentPath("/admin/documents")}>
                        <Icon name="download" />
                        Documentos
                    </Menu.Item>
                </>
            )}
        </Menu>
    );
}
