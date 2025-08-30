import React from 'react'
import { Banner, ContactForm, ImageGalleryHome, ListDocumentsHome, ListProjectsHome, ListTeamHome } from '../../../components/Web'
import {About} from "../../../components/Web/GeneralInfo/About"
import { OurWork } from '../../../components/Web/GeneralInfo/OurWork'
import { ListPostsHome } from '../../../components/Web/Home/BlogHome/ListPostsHome/ListPostsHome'
// import { ListTeamHome } from '../../../components/Web/Home/TeamHome/ListTeamHome/ListTeamHome'
// import { ListDocumentsHome } from '../../../components/Web/Home/DocumentsHome/ListDocumentsHome'
// import { ImageGalleryHome } from '../../../components/Web/Home/ImageGalleryHome/ImageGalleryHome'



export function Home() {
    return (
        <div>
            <Banner/>
            <About/>
            <ListPostsHome/>
            <ListProjectsHome/>
            <ListTeamHome/>
            <OurWork/>
            <ImageGalleryHome/>
            <ListDocumentsHome/>
            <ContactForm/>
        </div>
    )
}
