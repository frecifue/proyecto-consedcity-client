import React from 'react'
import { Banner, ContactForm } from '../../../components/Web'
import {Team} from "../Team"
import { Blog } from '../Blog'
import { About } from '../About'
import { OurWork } from '../../../components/Web/General_Info/OurWork'
import {ImageGallery} from "../../../components/Web/ImageGallery"

export function Home() {
  return (
    <div>
      <Banner/>
      <About/>
      <Blog/>
      <Team/>
      <OurWork/>
      <ImageGallery/>
      <ContactForm/>
    </div>
  )
}
