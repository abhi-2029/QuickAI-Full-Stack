// import { useAuth } from '@clerk/clerk-react';
// import { Hash, Sparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import toast from 'react-hot-toast'
// import Markdown from 'react-markdown'
// import axios from 'axios'

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const BlogTitles = () => {

//   const blogCategories = ['General',  'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']
  
//     const [selectedCategory, setSelectedCategory] = useState('General')
//     const [input, setInput] = useState('')

//     const [loading, setLoading] = useState(false)
//     const [content, setContent] = useState('')

//     const {getToken} = useAuth()
  
//     const onSubmitHandler = async (e)=>{
//       e.preventDefault();
//       try {
//          setLoading(true)
//          const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`

//          const { data } = await axios.post('/api/ai/generate-blog-title', {prompt}, {headers: {Authorization: `Bearer ${await getToken()}`}})

//          if (data.success) {
//           setContent(data.content)
//          }else{
//           toast.error(data.message)
//          }
//       } catch (error) {
//         toast.error(error.message)
//       }
//       setLoading(false)
//     }

//   return (
//     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
//       {/* left col */}
//       <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
//           <div className='flex items-center gap-3'>
//             <Sparkles className='w-6 text-[#8E37EB]'/>
//             <h1 className='text-xl font-semibold'>AI Title Generator</h1>
//           </div>
//           <p className='mt-6 text-sm font-medium'>Keyword</p>

//           <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of artificial intelligence is...' required/>

//           <p className='mt-4 text-sm font-medium'>Category</p>

//           <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
//             {blogCategories.map((item)=>(
//               <span onClick={()=> setSelectedCategory(item)} 
//               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300'}`} key={item}>{item}</span>
//             ) )}
//           </div>
//           <br/>
//           <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
//             {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Hash className='w-5'/>}
//             Generate title
//           </button>
//       </form>
//       {/* Right col */}
//       <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>

//             <div className='flex items-center gap-3'>
//               <Hash className='w-5 h-5 text-[#8E37EB]' />
//               <h1 className='text-xl font-semibold'>Generated titles</h1>
//             </div>
//             {
//               !content ? (
//                 <div className='flex-1 flex justify-center items-center'>
//                   <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
//                     <Hash className='w-9 h-9' />
//                     <p>Enter a topic and click “Generated title” to get started</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
//                   <div className='reset-tw'>
//                     <Markdown>{content}</Markdown>
//                   </div>
//                 </div>
//               )
//             }
            
//       </div>
//     </div>
//   )
// }

// export default BlogTitles
import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {

  const blogCategories = ['General','Technology','Business','Health','Lifestyle','Education','Travel','Food']
  
  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()
  
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)

      const prompt = `Generate 5 blog titles for ${input} in ${selectedCategory} category`;

      const { data } = await axios.post(
        '/api/ai/blog-title',   // ✅ FIXED ROUTE (same pattern as article)
        { prompt },
        {
          headers: { Authorization: `Bearer ${await getToken()}` } // ✅ SAME AS ARTICLE
        }
      );

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

      {/* left col - CONFIGURATION FORM */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-purple-50 text-purple-600'>
            <Sparkles className='w-5 h-5'/>
          </div>
          <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>AI Title Generator</h1>
        </div>

        <p className='mt-6 text-sm font-semibold text-slate-600'>Keyword</p>

        <input
          onChange={(e)=>setInput(e.target.value)}
          value={input}
          type="text"
          className='w-full p-3 mt-2 outline-none text-sm rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 placeholder-slate-400 bg-slate-50/20'
          placeholder='Enter topic...'
          required
        />

        <p className='mt-4 text-sm font-semibold text-slate-600'>Category</p>

        <div className='mt-3 flex gap-2 flex-wrap'>
          {blogCategories.map((item)=>(
            <button
              key={item}
              type='button'
              onClick={()=> setSelectedCategory(item)}
              className={`text-xs px-4 py-1.5 border rounded-full cursor-pointer transition-all duration-200 ${
                selectedCategory === item
                ? 'bg-purple-50 text-purple-700 border-purple-300 font-medium'
                : 'bg-slate-50/50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-medium px-4 py-2.5 mt-6 text-sm rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-purple-500/10'
        >
          {loading
            ? <span className='w-4 h-4 border-2 border-t-transparent animate-spin rounded-full'></span>
            : <Hash className='w-4 h-4'/>}
          Generate title
        </button>
      </form>

      {/* Right col - OUTPUT CARD */}
      <div className='w-full max-w-lg p-6 bg-white/90 backdrop-blur-md rounded-2xl flex flex-col border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-96'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-purple-50 text-purple-600'>
            <Hash className='w-5 h-5' />
          </div>
          <h1 className='text-xl font-semibold text-slate-800 tracking-tight'>Generated titles</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex flex-col justify-center items-center py-12'>
            <div className='text-sm flex flex-col items-center gap-4 text-slate-400'>
              <div className='p-4 rounded-full bg-slate-50 border border-slate-100'>
                <Hash className='w-8 h-8 text-slate-300' />
              </div>
              <p className='text-slate-500 font-medium'>Enter a topic and click “Generate title”</p>
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

export default BlogTitles