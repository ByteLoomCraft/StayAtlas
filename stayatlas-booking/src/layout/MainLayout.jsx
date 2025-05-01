import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/footer'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <div className='flex-1 h-full'>
          <Header />
          <Outlet/>
          <Footer />
        </div>
    </div>
  )
}

export default MainLayout