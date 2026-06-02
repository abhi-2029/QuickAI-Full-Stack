import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {

    const navigate = useNavigate()

  return (
    <div className='px-6 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center items-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen pt-20'>

        <div className='text-center mb-8 max-w-4xl mx-auto'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-slate-800 leading-[1.15] tracking-tight'>
              Create amazing content <br/> with <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'>AI tools</span>
            </h1>
            <p className='mt-6 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-sm sm:text-base text-slate-500 leading-relaxed'>
              Transform your content creation workflow with our suite of premium AI tools. Write articles, generate images, erase backgrounds, and supercharge your writing in seconds.
            </p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-semibold'>
            <button 
              onClick={() => navigate('/ai')} 
              className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-9 py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-indigo-500/20 cursor-pointer'
            >
              Start creating now
            </button>
            <button 
              className='bg-white hover:bg-slate-50 text-slate-700 px-9 py-3.5 rounded-xl border border-slate-200/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer'
            >
              Watch demo
            </button>
        </div>
        
        <div className='inline-flex items-center gap-3 mt-12 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.015)] text-xs sm:text-sm text-slate-500'>
            <img src={assets.user_group} alt="user group" className='h-6 sm:h-7'/> 
            <span>Trusted by <span className='font-semibold text-slate-700'>10k+</span> creators worldwide</span>
        </div>
      
    </div>
  )
}

export default Hero

