import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

  const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', '3D style', 'Portrait style']
    
  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()
    
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      // ✅ FIXED ROUTE (same pattern as article/blog)
      const { data } = await axios.post(
        '/api/ai/image',
        { prompt, publish },
        {
          headers: { Authorization: `Bearer ${await getToken()}` }
        }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-6 text-slate-700 bg-slate-50/30'>

      {/* LEFT - CONFIGURATION FORM */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-emerald-50 text-emerald-600'>
            <Sparkles className='w-5 h-5'/>
          </div>
          <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>AI Image Generator</h1>
        </div>

        <p className='mt-6 text-sm font-semibold text-slate-600'>Describe Your Image</p>

        <textarea
          onChange={(e)=>setInput(e.target.value)}
          value={input}
          rows={4}
          className='w-full p-3 mt-2 outline-none text-sm rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 resize-none placeholder-slate-400 bg-slate-50/20'
          placeholder='Describe what you want to see in the image..'
          required
        />

        <p className='mt-4 text-sm font-semibold text-slate-600'>Style</p>

        <div className='mt-3 flex gap-2 flex-wrap'>
          {imageStyle.map((item)=>(
            <button
              key={item}
              type='button'
              onClick={()=> setSelectedStyle(item)}
              className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-all duration-200 ${
                selectedStyle === item
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-medium'
                  : 'bg-slate-50/50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className='my-6 flex items-center gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100'>
          <label className='relative cursor-pointer select-none'>
            <input
              type="checkbox"
              onChange={(e)=>setPublish(e.target.checked)}
              checked={publish}
              className='sr-only peer'
            />

            <div className='w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-colors duration-300'></div>

            <span className='absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4 shadow-sm'></span>
          </label>
          <p className='text-sm text-slate-600 font-medium select-none'>Make this image Public</p>
        </div>

        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium px-4 py-2.5 mt-2 text-sm rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-emerald-500/10'
        >
          {
            loading
              ? <span className='w-4 h-4 border-2 border-t-transparent animate-spin rounded-full'></span>
              : <Image className='w-4 h-4'/>
          }
          Generate Image
        </button>
      </form>

      {/* RIGHT - PREVIEW CARD */}
      <div className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl flex flex-col border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-96'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-emerald-50 text-emerald-600'>
            <Image className='w-5 h-5' />
          </div>
          <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Generated image</h1>
        </div>

        {
          !content ? (
            <div className='flex-1 flex flex-col justify-center items-center py-12'>
              <div className='text-sm flex flex-col items-center gap-4 text-slate-400'>
                <div className='p-4 rounded-full bg-slate-50 border border-slate-100'>
                  <Image className='w-8 h-8 text-slate-300' />
                </div>
                <p className='text-slate-500 font-medium'>Enter a topic and click “Generate image”</p>
              </div>
            </div>
          ) : (
            <div className='mt-5 flex-1 relative overflow-hidden rounded-xl border border-slate-100 shadow-inner group'>
              <img 
                src={content} 
                alt="generated"
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                onError={(e) => {
                  e.target.src = "https://picsum.photos/800/600"; // fallback
                }}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default GenerateImages