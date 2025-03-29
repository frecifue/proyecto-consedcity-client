import React from 'react'
import {Routes, Route} from "react-router-dom"
import {AdminLayout} from "../layouts"
import {Auth, Users, GeneralInformation, Team, Menu, Posts, Blog} from "../pages/admin"
// import {Posts} from "../pages/admin/Posts"
import {useAuth} from "../hooks/useAuth"

export function AdminRouter() {
  const {user} = useAuth();

  // const user = null;

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
            {/* {["/admin", "/admin/posts"].map((path) => (
              <Route key={path} path={path} element={loadLayout(AdminLayout, Posts)} />
            ))} */}
            {["/admin", "/admin/blog"].map((path) => (
              <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />
            ))}
            {/* <Route path={"/admin/blog"} element={loadLayout(AdminLayout, Blog)} /> */}


            <Route path={"/admin/users"} element={loadLayout(AdminLayout, Users)} />
            <Route path={"/admin/menu"} element={loadLayout(AdminLayout, Menu)} />
            <Route path={"/admin/team"} element={loadLayout(AdminLayout, Team)} />
            <Route path={"/admin/gemeral_info"} element={loadLayout(AdminLayout, GeneralInformation)} />
          </>
        )}
      </Routes>
    // </AuthProvider>
  )
}