import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-100/60 shadow-[0_2px_25px_rgb(0,0,0,0.01)] flex justify-between items-center py-3.5 px-6 sm:px-20 xl:px-32 transition-all'>
      <img src={assets.logo} alt="logo" className='w-32 sm:w-40 cursor-pointer hover:opacity-90 transition-all' onClick={() => navigate('/')} />

      {
        user ? (
          <div className='flex items-center gap-4'>
            <button onClick={() => navigate('/ai')} className='flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-5 py-2 rounded-full transition-all'>
              Dashboard
            </button>
            <UserButton /> 
          </div>
        ) : (
          <button 
            onClick={openSignIn} 
            className='flex items-center gap-2 rounded-full text-xs font-bold cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-2.5 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
          >
            Get started 
            <ArrowRight className='w-3.5 h-3.5' /> 
          </button>
        )
      }
    </div>
  )
}

export default Navbar

