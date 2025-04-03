import React from 'react'
import { Banner, ContactForm, ListPosts, ListTeam, MenuAnchor } from '../../../components/Web'
import {About} from "../../../components/Web/General_Info/About"
import { OurWork } from '../../../components/Web/General_Info/OurWork'
import {ImageGallery} from "../../../components/Web/ImageGallery"


export function Home() {
  return (
    <div>
      <MenuAnchor />
      <Banner/>
      <About/>
      <ListPosts />
      <ListTeam/>
      <OurWork/>
      <ImageGallery/>
      <ContactForm/>
    </div>
  )
}
