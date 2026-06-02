import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {

  const [creations, setCreations] = useState([])
  const {user} = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async ()=>{
    try {
      const {data} = await axios.get('/api/user/get-published-creations', {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })
      if (data.success){
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id)=>{
    try {
      const {data} = await axios.post('/api/user/toggle-like-creation', {id}, {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success){
        toast.success(data.message)
        await fetchCreations()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user){
      fetchCreations()
    }
  },[user])

  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-6 p-6 bg-slate-50/30 overflow-y-scroll'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>Community Gallery</h1>
        <p className='text-sm text-slate-500'>Discover AI art and creations published by other users</p>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6'>
        {creations.map((creation, index)=> (
          <div key={index} className='bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden flex flex-col relative group transition-all duration-300 hover:shadow-lg hover:shadow-slate-100/80'>
            
            {creation.type === 'image' ? (
              <div className='aspect-4/3 relative overflow-hidden bg-slate-50 group'>
                <img src={creation.content} alt="" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'/>
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white'>
                  <p className='text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1'>Prompt</p>
                  <p className='text-sm font-medium leading-snug line-clamp-2'>{creation.prompt}</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 p-5 min-h-48 bg-slate-50/30 flex flex-col justify-between border-b border-slate-50'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1'>{creation.type}</p>
                  <p className='text-sm font-medium text-slate-700 line-clamp-4 italic'>"{creation.prompt}"</p>
                </div>
                <div className='mt-4 text-xs text-slate-400 font-medium line-clamp-3 overflow-hidden bg-white p-3 rounded-lg border border-slate-100'>
                  {creation.content}
                </div>
              </div>
            )}

            <div className='p-4 flex items-center justify-between bg-white border-t border-slate-50'>
              <div className='flex items-center gap-2'>
                <div className='w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-xs flex items-center justify-center border border-indigo-100/50 uppercase'>
                  {creation.user_id ? creation.user_id.slice(-2) : 'AI'}
                </div>
                <span className='text-xs text-slate-500 font-medium'>
                  {new Date(creation.created_at).toLocaleDateString()}
                </span>
              </div>

              <button 
                onClick={()=> imageLikeToggle(creation.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-semibold cursor-pointer ${
                  creation.likes.includes(user?.id) 
                    ? 'bg-rose-50 border-rose-200 text-rose-600' 
                    : 'bg-slate-50/50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${creation.likes.includes(user?.id) ? 'fill-rose-600' : ''}`}/>
                <span>{creation.likes.length}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full bg-slate-50/20'>
      <span className='w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community
