import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'

const AiTools = () => {

    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

    const handleToolClick = (path) => {
      if (user) {
        navigate(path)
      } else {
        openSignIn()
      }
    }

  return (
    <div className='px-6 sm:px-20 xl:px-32 my-28'>
      <div className='text-center max-w-2xl mx-auto'>
        <h2 className='text-slate-800 text-3xl sm:text-4xl font-extrabold tracking-tight'>Powerful AI Suite</h2>
        <p className='text-slate-500 mt-4 text-sm sm:text-base leading-relaxed'>Everything you need to write articles, generate images, review resumes, and optimize media files with cutting-edge AI technologies.</p>
      </div>

      <div className='flex flex-wrap mt-14 justify-center gap-6 sm:gap-8'>
        {AiToolsData.map((tool, index)=>(
            <div 
              key={index} 
              className='p-8 w-full max-w-[320px] rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.01)] border border-slate-100/90 hover:border-slate-200/50 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-slate-100/40 transition-all duration-300 cursor-pointer group flex flex-col items-start' 
              onClick={() => handleToolClick(tool.path)}
            >
                <div 
                  className='p-3 text-white rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md' 
                  style={{background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`}}
                >
                  <tool.Icon className='w-6 h-6' />
                </div>
                <h3 className='mt-6 mb-3 text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight'>{tool.title}</h3>
                <p className='text-slate-400 text-sm leading-relaxed'>{tool.description}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default AiTools

