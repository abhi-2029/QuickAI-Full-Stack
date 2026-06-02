// import { Edit, Sparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useAuth } from '@clerk/clerk-react';
// import toast from 'react-hot-toast';
// import Markdown from 'react-markdown';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const WriteArticle = () => {

//   const articleLength = [
//     {length: 800, text: 'Short (500-800 words)'},
//     {length: 1200, text: 'Medium (800-1200 words)'},
//     {length: 1600, text: 'Long (1200+ words)'}
//   ]

//   const [selectedLength, setSelectedLength] = useState(articleLength[0])
//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [content, setContent] = useState('')

//   const {getToken} = useAuth()

//   const onSubmitHandler = async (e)=>{
//     e.preventDefault();
//     try {
//       setLoading(true)
//       const prompt = `Write an article about ${input} in ${selectedLength.text}`

//       const {data} = await axios.post('/api/ai/generate-article', {prompt, length:selectedLength.length}, {
//         headers: {Authorization: `Bearer ${await getToken()}`}
//       })

//       if(data.success){
//         setContent(data.content)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   }

//   return (
//     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
//       {/* left col */}
//       <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
//           <div className='flex items-center gap-3'>
//             <Sparkles className='w-6 text-[#4A7AFF]'/>
//             <h1 className='text-xl font-semibold'>Article Configuration</h1>
//           </div>
//           <p className='mt-6 text-sm font-medium'>Article Topic</p>

//           <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of artificial intelligence is...' required/>

//           <p className='mt-4 text-sm font-medium'>Article Length</p>

//           <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
//             {articleLength.map((item, index)=>(
//               <span onClick={()=> setSelectedLength(item)} 
//               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`} key={index}>{item.text}</span>
//             ) )}
//           </div>
//           <br/>
//           <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
//             {
//               loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
//               : <Edit className='w-5'/>
//             }
//             Generate article
//           </button>
//       </form>
//       {/* Right col */}
//       <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

//             <div className='flex items-center gap-3'>
//               <Edit className='w-5 h-5 text-[#4A7AFF]' />
//               <h1 className='text-xl font-semibold'>Generated article</h1>
//             </div>

//             {!content ? (
//               <div className='flex-1 flex justify-center items-center'>
//               <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
//                 <Edit className='w-9 h-9' />
//                 <p>Enter a topic and click “Generate article ” to get started</p>
//               </div>
//             </div>
//             ) : (
//               <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
//                 <div className='reset-tw'>
//                   <Markdown>{content}</Markdown>
//                 </div>
//               </div>
//             )}
            
//       </div>
//     </div>
//   )
// }

// export default WriteArticle


import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  const articleLength = [
    {length: 800, text: 'Short (500-800 words)'},
    {length: 1200, text: 'Medium (800-1200 words)'},
    {length: 1600, text: 'Long (1200+ words)'}
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const {data} = await axios.post('/api/ai/article', {prompt, length:selectedLength.length}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
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
            <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Article Configuration</h1>
          </div>
          <p className='mt-6 text-sm font-semibold text-slate-600'>Article Topic</p>

          <input 
            onChange={(e)=>setInput(e.target.value)} 
            value={input} 
            type="text" 
            className='w-full p-3 mt-2 outline-none text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder-slate-400 bg-slate-50/20' 
            placeholder='The future of artificial intelligence is...' 
            required
          />

          <p className='mt-4 text-sm font-semibold text-slate-600'>Article Length</p>

          <div className='mt-3 flex gap-2 flex-wrap'>
            {articleLength.map((item, index)=>(
              <button
                key={index}
                type="button"
                onClick={()=> setSelectedLength(item)}
                className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-all duration-200 ${
                  selectedLength.text === item.text
                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-medium'
                    : 'bg-slate-50/50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>

          <button 
            disabled={loading} 
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-4 py-2.5 mt-6 text-sm rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-blue-500/10'
          >
            {
              loading ? <span className="w-4 h-4 border-2 border-t-transparent animate-spin rounded-full"></span>
              : <Edit className='w-4 h-4'/>
            }
            Generate article
          </button>
      </form>

      {/* Right col - OUTPUT CARD */}
      <div className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl flex flex-col border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-96 max-h-[600px]'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-blue-50 text-blue-600'>
                <Edit className='w-5 h-5' />
              </div>
              <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Generated article</h1>
            </div>

            {!content ? (
              <div className='flex-1 flex flex-col justify-center items-center py-12'>
                <div className='text-sm flex flex-col items-center gap-4 text-slate-400'>
                  <div className='p-4 rounded-full bg-slate-50 border border-slate-100'>
                    <Edit className='w-8 h-8 text-slate-300' />
                  </div>
                  <p className='text-slate-500 font-medium'>Enter a topic and click “Generate article” to get started</p>
                </div>
              </div>
            ) : (
              <div className='mt-5 flex-1 overflow-y-scroll text-sm text-slate-600 pr-2 border-t border-slate-100 pt-4'>
                <div className='reset-tw leading-relaxed'>
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )}
      </div>
    </div>
  )
}

export default WriteArticle