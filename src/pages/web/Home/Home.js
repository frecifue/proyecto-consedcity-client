import React from 'react'
import { Banner, ContactForm, ListPosts, ListTeam } from '../../../components/Web'
import {About} from "../../../components/Web/General_Info/About"
import { OurWork } from '../../../components/Web/General_Info/OurWork'
import {ImageGallery} from "../../../components/Web/ImageGallery"
import { ListDocuments } from '../../../components/Web/Documents/ListDocuments'


export function Home() {
  return (
    <div>
      <Banner/>
      <About/>
      <ListPosts />
      <ListTeam/>
      <OurWork/>
      <ImageGallery/>
      <ListDocuments/>
      <ContactForm/>
    </div>
  )
}
