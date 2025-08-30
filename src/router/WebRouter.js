import React from 'react'
import {Routes, Route} from "react-router-dom"
import {Home, Post} from "../pages/web"
import {WebLayout} from "../layouts"
import { Project } from '../pages/web/Project/Project'

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
            <Route path="/blog/:path" element={loadLayout(WebLayout, Post)}></Route>
            <Route path="/project/:path" element={loadLayout(WebLayout, Project)}></Route>
        </Routes>
    )
}
