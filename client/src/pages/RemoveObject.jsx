import { Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {

  const [input, setInput] = useState('')
  const [object, setObject] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()
      
    const onSubmitHandler = async (e)=>{
          e.preventDefault();
          try {
            setLoading(true)

            if(object.split(' ').length > 1){
              return toast('Please enter only one object name')
            }

              const formData = new FormData()
              formData.append('image', input)
              formData.append('object', object)

              const { data } = await axios.post('/api/ai/remove-image-object',formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

            if (data.success) {
              setContent(data.content)
            }else{
              toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
          setLoading(false)
        }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-6 text-slate-700 bg-slate-50/30'>
      {/* left col - CONFIGURATION FORM */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'>

          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-blue-50 text-blue-600'>
              <Sparkles className='w-5 h-5'/>
            </div>
            <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Object Removal</h1>
          </div>

          <p className='mt-6 text-sm font-semibold text-slate-600'>Upload image</p>

          <input 
            onChange={(e)=>setInput(e.target.files[0])} 
            type="file" 
            accept='image/*' 
            className='w-full p-2.5 mt-2 outline-none text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer bg-slate-50/20' 
            required
          />

          <p className='mt-6 text-sm font-semibold text-slate-600'>Describe object name to remove</p>

          <textarea 
            onChange={(e)=>setObject(e.target.value)} 
            value={object} 
            rows={3} 
            className='w-full p-3 mt-2 outline-none text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none placeholder-slate-400 bg-slate-50/20' 
            placeholder='e.g., watch or spoon (Only single object name)' 
            required
          />
          
          <button 
            disabled={loading} 
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-4 py-2.5 mt-6 text-sm rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-blue-500/10'
          >
            {
              loading ? <span className='w-4 h-4 border-2 border-t-transparent animate-spin rounded-full'></span>
              : <Scissors className='w-4 h-4'/>
            }
            Remove object
          </button>
      </form>

      {/* Right col - OUTPUT PREVIEW */}
      <div className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl flex flex-col border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-96'>

            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-blue-50 text-blue-600'>
                <Scissors className='w-5 h-5' />
              </div>
              <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Processed Image</h1>
            </div>

            {
              !content ? 
              (
                <div className='flex-1 flex flex-col justify-center items-center py-12'>
                  <div className='text-sm flex flex-col items-center gap-4 text-slate-400'>
                    <div className='p-4 rounded-full bg-slate-50 border border-slate-100'>
                      <Scissors className='w-8 h-8 text-slate-300' />
                    </div>
                    <p className='text-slate-500 font-medium'>Upload an image and click "Remove Object"</p>
                  </div>
                </div>
              ) :
              (
                <div className='mt-5 flex-1 relative overflow-hidden rounded-xl border border-slate-100 shadow-inner group'>
                  <img 
                    src={content} 
                    alt="processed" 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
              )
            }
      </div>
    </div>
   
  )
}

export default RemoveObject
