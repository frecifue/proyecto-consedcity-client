import React from 'react'
import {Routes, Route} from "react-router-dom"
import {AdminLayout} from "../layouts"
import {Auth, Users, GeneralInfo, Team, Menu, Blog, Documents, Projects} from "../pages/admin"
import {useAuth} from "../hooks/useAuth"
import { ImageGallery } from '../pages/admin/ImageGallery/ImageGallery'

export function AdminRouter() {
  const {user} = useAuth();

  const loadLayout = (Layout, Page) =>{
    return (
      <Layout>
        <Page/>
      </Layout> 
    )
  }

  return (
    // <AuthProvider>
      
      <Routes>
        {!user ? (
          <Route path="/admin/*" element={<Auth/>}></Route>
        ): (
          <>
            {["/admin", "/admin/blog"].map((path) => (
              <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />
            ))}

            <Route path={"/admin/users"} element={loadLayout(AdminLayout, Users)} />
            <Route path={"/admin/menu"} element={loadLayout(AdminLayout, Menu)} />
            <Route path={"/admin/team"} element={loadLayout(AdminLayout, Team)} />
            <Route path={"/admin/general_info"} element={loadLayout(AdminLayout, GeneralInfo)} />
            <Route path={"/admin/image_gallery"} element={loadLayout(AdminLayout, ImageGallery)} />
            <Route path={"/admin/documents"} element={loadLayout(AdminLayout, Documents)} />
            <Route path={"/admin/projects"} element={loadLayout(AdminLayout, Projects)} />
          </>
        )}
      </Routes>
    // </AuthProvider>
  )
}