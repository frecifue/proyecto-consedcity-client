import React from 'react'
import {Routes, Route} from "react-router-dom"
import {Home, Post} from "../pages/web"
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
            <Route path="/blog/:path" element={loadLayout(WebLayout, Post)}></Route>
        </Routes>
    )
}
