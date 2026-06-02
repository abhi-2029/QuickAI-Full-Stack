import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
    {to: '/ai', label: 'Dashboard', Icon: House},
    {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
    {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
    {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
    {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
    {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
    {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
    {to: '/ai/community', label: 'Community', Icon: Users},
]

const Sidebar = ({ sidebar, setSidebar }) => {

    const {user} = useUser();
    const {signOut, openUserProfile} = useClerk()

  return (
    <div className={`w-64 h-full bg-white/80 backdrop-blur-xl border-r border-slate-100 flex flex-col justify-between items-stretch max-sm:fixed max-sm:top-16 max-sm:bottom-0 max-sm:z-40 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className='my-6 w-full px-4 flex-1 overflow-y-auto'>
        <div className='flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 mb-6'>
          <div className='relative flex-shrink-0'>
            <img src={user.imageUrl} alt="User avatar" className='w-11 h-11 rounded-full border-2 border-indigo-50 shadow-sm'/>
            <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full'></span>
          </div>
          <div className='min-w-0'>
            <h2 className='font-bold text-slate-800 text-sm tracking-tight truncate'>{user.fullName}</h2>
            <p className='text-[10px] font-semibold text-slate-400 mt-0.5 tracking-wide uppercase'>
              <Protect plan='premium' fallback="Free Plan">Premium Plan</Protect>
            </p>
          </div>
        </div>
        
        <div className='space-y-1 text-sm font-semibold text-slate-500'>
            {navItems.map(({to, label, Icon})=>(
                <NavLink key={to} to={to} end={to === '/ai'} onClick={()=> setSidebar(false)} className={({isActive})=> `px-3.5 py-2.5 flex items-center gap-3.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-500/8 to-purple-500/4 text-indigo-600 border-l-[3px] border-indigo-500' : 'hover:bg-slate-50/80 hover:text-slate-800'}`}>
                    {({ isActive })=>(
                        <>
                        <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-indigo-500' : 'text-slate-400'}` } />
                        <span>{label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </div>
      </div>

      <div className='border-t border-slate-100 p-4 px-6 flex items-center justify-between bg-slate-50/10'>
            <div onClick={openUserProfile} className='flex gap-2.5 items-center cursor-pointer group min-w-0'>
                <img src={user.imageUrl} className='w-8 h-8 rounded-full border border-slate-200 shadow-sm group-hover:border-indigo-300 transition-colors' alt="" />
                <div className='min-w-0'>
                    <h1 className='text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors truncate'>{user.fullName}</h1>
                    <p className='text-[10px] text-slate-400 font-medium tracking-wide uppercase'>Settings</p>
                </div>
            </div>
            <button onClick={signOut} className='p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer' title="Sign Out">
                <LogOut className='w-4.5 h-4.5'/>
            </button>
      </div>
    </div>
  )
}

export default Sidebar

