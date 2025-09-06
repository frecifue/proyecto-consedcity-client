
import React from 'react'
import {Routes, Route} from "react-router-dom"
import {AdminLayout} from "../layouts"
import {Auth, Users, GeneralInfo, Team, Menu, Blog, Documents, Projects} from "../pages/admin"
import {useAuth} from "../hooks/useAuth"
import { ImageGallery } from '../pages/admin/ImageGallery/ImageGallery'
import { NotFound } from '../components/Shared'

export function AdminRouter() {
  const {user} = useAuth();

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page/>
      </Layout> 
    )
  }

  return (
    <Routes>
      {!user ? (
        <Route path="*" element={<Auth />} />
      ) : (
        <>
          <Route path="/" element={loadLayout(AdminLayout, Blog)} />
          <Route path="blog" element={loadLayout(AdminLayout, Blog)} />
          <Route path="users" element={loadLayout(AdminLayout, Users)} />
          <Route path="menu" element={loadLayout(AdminLayout, Menu)} />
          <Route path="team" element={loadLayout(AdminLayout, Team)} />
          <Route path="general_info" element={loadLayout(AdminLayout, GeneralInfo)} />
          <Route path="image_gallery" element={loadLayout(AdminLayout, ImageGallery)} />
          <Route path="documents" element={loadLayout(AdminLayout, Documents)} />
          <Route path="projects" element={loadLayout(AdminLayout, Projects)} />
          <Route path="*" element={loadLayout(AdminLayout, () => <NotFound enableLink={false} />)} />
        </>
      )}
    </Routes>
  )
}
