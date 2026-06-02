import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, UserButton, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen overflow-hidden bg-slate-50/20'>

      <nav className='sticky top-0 z-50 w-full px-6 sm:px-8 h-16 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.01)]'>
        <div className='flex items-center gap-3'>
          {
            sidebar ? (
              <X onClick={() => setSidebar(false)} className='w-6 h-6 text-slate-500 sm:hidden cursor-pointer hover:text-slate-800 transition' />
            ) : (
              <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-slate-500 sm:hidden cursor-pointer hover:text-slate-800 transition' />
            )
          }
          <img className='cursor-pointer w-32 sm:w-40 hover:opacity-90 transition' src={assets.logo} alt="logo" onClick={() => navigate('/')} />
        </div>
        <div className='flex items-center gap-4'>
          <UserButton />
        </div>
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)] overflow-hidden relative'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-slate-50/30 overflow-hidden'>
          <Outlet />
        </div>
      </div>
      
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen bg-slate-50/50'>
      <SignIn />
    </div>
  )
}

export default Layout

