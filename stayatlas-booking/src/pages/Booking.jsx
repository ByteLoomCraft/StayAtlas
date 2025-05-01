import React from 'react'
import Footer from '../components/footer'
import Header from '../components/Header'
import VillaHeader from '../components/VillaHeader'
import VillaDetails from '../components/VilaDetail'
import Testimonials from '../components/Testimonials'
import Gallery from "../components/Gallery"

const Booking = () => {
  return (
    <div>
      <VillaHeader/>
      <Gallery/>
      <VillaDetails/>
      <Testimonials/>
    </div>
  )
}

export default Booking