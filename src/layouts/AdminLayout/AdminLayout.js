import React from 'react'
import {Icon} from "../../assets"
import "./AdminLayout.scss"
import {AdminMenu} from "../../components/Admin/AdminLayout"
import { Logout } from '../../components/Admin/AdminLayout/Logout/Logout'
import { Welcome } from '../../components/Admin/AdminLayout/Welcome/Welcome'

export function AdminLayout(props) {
    const {children} = props;
    return (
        <div className='admin-layout'>
            <div className='admin-layout__left'>
                {/* <Icon.LogoWhite className='logo'/> */}
                <img src={Icon.LogoBlanco} alt="Logo" className="logo" />
                <AdminMenu/>
            </div>
            <div className='admin-layout__right'>                
                <div className='admin-layout__right-header'>
                    <Welcome/>
                    <Logout/>
                </div>
                <div className='admin-layout__right-content'>{children}</div>
            </div>
        </div>
    )
}
