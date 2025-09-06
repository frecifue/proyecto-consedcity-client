import React from 'react'
import {Routes, Route} from "react-router-dom"
import {Home, Post} from "../pages/web"
import {WebLayout} from "../layouts"
import { Project } from '../pages/web/Project/Project'
import { NotFound } from '../components/Shared'

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
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    )
}
