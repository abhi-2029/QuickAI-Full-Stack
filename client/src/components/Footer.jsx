import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8 w-full text-slate-500 mt-28 border-t border-slate-100 bg-slate-50/20">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-12 border-b border-slate-200/60 pb-10">
        <div className="max-w-md">
            <img className="h-9 hover:opacity-95 transition-opacity" src={assets.logo} alt="logo"/>
            <p className="mt-6 text-sm text-slate-400 leading-relaxed">
                Experience the power of artificial intelligence with QuickAI. Transform your content creation workflow with our suite of premium AI writing, image generation, and design enhancement tools.
            </p>
        </div>
        <div className="flex-1 flex flex-wrap items-start lg:justify-end gap-16 sm:gap-24">
            <div>
                <h2 className="font-bold text-slate-800 mb-5 tracking-tight text-sm uppercase">Company</h2>
                <ul className="text-sm space-y-3 font-semibold">
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">About us</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact us</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="font-bold text-slate-800 mb-5 tracking-tight text-sm uppercase">Subscribe to our newsletter</h2>
                <div className="text-sm space-y-3 max-w-sm">
                    <p className="text-slate-400">The latest AI insights, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex items-center gap-2 pt-2">
                        <input className="border border-slate-200 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none w-full max-w-64 h-10 rounded-xl px-3.5 text-sm transition-all bg-white" type="email" placeholder="Enter your email" />
                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold w-24 h-10 text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer text-xs">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <p className="pt-6 text-center text-xs text-slate-400 font-medium">
        Copyright 2026 © GreatStack. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer

