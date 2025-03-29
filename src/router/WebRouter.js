import React from 'react'
import {Routes, Route} from "react-router-dom"
import {Home, Posts, Team, Post, Blog} from "../pages/web"
import {WebLayout} from "../layouts"

export function WebRouter() {

  const loadLayout = (Layout, Page) =>{
    return (
      <Layout>
        <Page/>
      </Layout> 
    )
  }
  
  return (
    <Routes>
        <Route path="/" element={loadLayout(WebLayout, Home)}></Route>
        {/* <Route path="/posts" element={loadLayout(WebLayout, Posts)}></Route>
        <Route path="/posts/:path" element={loadLayout(WebLayout, Post)}></Route> */}
        <Route path="/blog" element={loadLayout(WebLayout, Blog)}></Route>
        <Route path="/blog/:path" element={loadLayout(WebLayout, Post)}></Route>
    </Routes>
  )
}
