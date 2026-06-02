import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const ReviewResume = () => {

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const {getToken} = useAuth()
      
    const onSubmitHandler = async (e)=>{
          e.preventDefault();
          try {
            setLoading(true)

              const formData = new FormData()
              formData.append('resume', input)

              const { data } = await axios.post('/api/ai/resume-review',formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

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
            <div className='p-2 rounded-lg bg-teal-50 text-teal-600'>
              <Sparkles className='w-5 h-5'/>
            </div>
            <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Resume Review</h1>
          </div>
          <p className='mt-6 text-sm font-semibold text-slate-600'>Upload Resume</p>

          <input 
            onChange={(e)=>setInput(e.target.files[0])} 
            type="file" 
            accept='application/pdf' 
            className='w-full p-2.5 mt-2 outline-none text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer bg-slate-50/20' 
            required
          />

          <p className='text-xs text-slate-400 font-medium mt-2 pl-1'>Supports PDF format resumes only.</p>
          
          <button 
            disabled={loading}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-medium px-4 py-2.5 mt-6 text-sm rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-teal-500/10'
          >
            {
              loading ? 
              <span className='w-4 h-4 border-2 border-t-transparent animate-spin rounded-full'></span>
              :
              <FileText className='w-4 h-4'/>
            }
            Review Resume
          </button>
      </form>

      {/* Right col - OUTPUT PREVIEW */}
      <div className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl flex flex-col border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-96 max-h-[600px]'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-teal-50 text-teal-600'>
                <FileText className='w-5 h-5' />
              </div>
              <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Analysis Results</h1>
            </div>

            {
              !content ?
              (
                <div className='flex-1 flex flex-col justify-center items-center py-12'>
                  <div className='text-sm flex flex-col items-center gap-4 text-slate-400'>
                    <div className='p-4 rounded-full bg-slate-50 border border-slate-100'>
                      <FileText className='w-8 h-8 text-slate-300' />
                    </div>
                    <p className='text-slate-500 font-medium'>Upload a resume and click "Review Resume" to get started</p>
                  </div>
                </div>
              ) :
              (
                <div className='mt-5 flex-1 overflow-y-scroll text-sm text-slate-600 pr-2 border-t border-slate-100 pt-4'>
                  <div className='reset-tw leading-relaxed'>
                    <Markdown>{content}</Markdown>
                  </div>
                </div>
              )
            }
      </div>
    </div>
  )
}

export default ReviewResume
