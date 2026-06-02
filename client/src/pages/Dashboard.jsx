import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
 
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async ()=>{
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success) {
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(()=>{
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6 bg-slate-50/30 flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>Welcome to QuickAI</h1>
        <p className='text-sm text-slate-500'>Overview of your workspace, creations, and usage details</p>
      </div>

      <div className='flex justify-start gap-6 flex-wrap'>
        {/* Total Creations Card  */}
        <div className='flex justify-between items-center w-72 p-5 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-md hover:shadow-slate-100/50'>
            <div className='text-slate-600'>
              <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Total Creations</p>
              <h2 className='text-3xl font-bold text-slate-800 mt-1'>{creations.length}</h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex justify-center items-center shadow-lg shadow-blue-500/10'>
              <Sparkles className='w-5 h-5 text-white' />
            </div>
        </div>

        {/* Active Plan Card  */}
        <div className='flex justify-between items-center w-72 p-5 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-md hover:shadow-slate-100/50'>
            <div className='text-slate-600'>
              <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Active Plan</p>
              <h2 className='text-3xl font-bold text-slate-800 mt-1'>
                <Protect plan='premium' fallback="Free">Premium</Protect>
              </h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white flex justify-center items-center shadow-lg shadow-purple-500/10'>
              <Gem className='w-5 h-5 text-white' />
            </div>
        </div>
      </div>

      {
        loading ? 
        (
          <div className='flex-1 flex justify-center items-center min-h-[300px]'>
            <div className='animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent'></div>
          </div>
        )
        :
        (
          <div className='space-y-4'>
            <div className='border-b border-slate-100 pb-2 mt-4'>
              <h2 className='text-lg font-bold text-slate-700 tracking-tight'>Recent Creations</h2>
            </div>
            <div className='space-y-3 pb-6'>
              {creations.length > 0 ? (
                creations.map((item)=> <CreationItem key={item.id} item={item}/>)
              ) : (
                <div className='p-12 text-center bg-white rounded-2xl border border-slate-100 text-slate-400 font-medium'>
                  No creations yet. Get started by selecting a tool from the sidebar!
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Dashboard
