import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, FileText, Hash, Image, Scissors, Eraser, SquarePen, Sparkles } from 'lucide-react'

const getToolBadgeConfig = (type) => {
  switch (type) {
    case 'image':
      return {
        label: 'AI Image',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-100/80',
        Icon: Image
      }
    case 'article':
      return {
        label: 'AI Article',
        className: 'bg-indigo-50 text-indigo-700 border-indigo-100/80',
        Icon: SquarePen
      }
    case 'blog-title':
      return {
        label: 'Blog Title',
        className: 'bg-purple-50 text-purple-700 border-purple-100/80',
        Icon: Hash
      }
    case 'remove-background':
      return {
        label: 'BG Removed',
        className: 'bg-orange-50 text-orange-700 border-orange-100/80',
        Icon: Eraser
      }
    case 'remove-object':
      return {
        label: 'Object Removed',
        className: 'bg-amber-50 text-amber-700 border-amber-100/80',
        Icon: Scissors
      }
    case 'review-resume':
      return {
        label: 'Resume Review',
        className: 'bg-teal-50 text-teal-700 border-teal-100/80',
        Icon: FileText
      }
    default:
      return {
        label: type,
        className: 'bg-slate-50 text-slate-700 border-slate-200/80',
        Icon: Sparkles
      }
  }
}

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)
  const config = getToolBadgeConfig(item.type)
  const ToolIcon = config.Icon

  return (
    <div 
      onClick={() => setExpanded(!expanded)} 
      className='p-5 max-w-5xl bg-white border border-slate-100 rounded-2xl cursor-pointer shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-md hover:border-slate-200/60 transition-all duration-300 group'
    >
      <div className='flex justify-between items-center gap-4'>
        <div className='flex items-center gap-4 min-w-0'>
          <div className={`w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center bg-slate-50/50 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors`}>
            <ToolIcon className='w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors' />
          </div>
          <div className='min-w-0'>
            <h2 className='text-sm font-semibold text-slate-800 truncate pr-2'>{item.prompt}</h2>
            <p className='text-xs text-slate-400 mt-1 font-medium'>
              {new Date(item.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className='flex items-center gap-3 flex-shrink-0'>
          <span className={`text-[11px] font-semibold tracking-wide border px-3 py-1 rounded-full ${config.className}`}>
            {config.label}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ${expanded ? 'rotate-180 text-indigo-600' : ''}`} />
        </div>
      </div>

      {expanded && (
        <div className='mt-4 pt-4 border-t border-slate-100 animate-[fadeIn_0.2s_ease-out]'>
          {item.type === 'image' ? (
            <div className='flex justify-center sm:justify-start'>
              <div className='rounded-xl overflow-hidden border border-slate-100 max-w-md bg-slate-50 shadow-sm'>
                <img src={item.content} alt="Generated AI content" className='w-full object-contain' />
              </div>
            </div>
          ) : (
            <div className='p-4 rounded-xl border border-slate-100/80 bg-slate-50/50 max-h-[350px] overflow-y-auto text-sm text-slate-700 leading-relaxed scrollbar-thin'>
              <div className='reset-tw prose prose-slate max-w-none'>
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem

