import { assets } from "../assets/assets"

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
        <div className='px-6 sm:px-20 xl:px-32 py-28 bg-slate-50/20 border-t border-b border-slate-100/50'>
            <div className='text-center max-w-2xl mx-auto'>
                <h2 className='text-slate-800 text-3xl sm:text-4xl font-extrabold tracking-tight'>Loved by Creators</h2>
                <p className='text-slate-500 mt-4 text-sm sm:text-base leading-relaxed'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className='flex flex-wrap mt-14 justify-center gap-6 sm:gap-8'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div key={index} className='p-8 w-full max-w-[320px] rounded-2xl bg-white border border-slate-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-lg hover:shadow-slate-100/40 hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col justify-between'>
                        <div>
                          <div className="flex items-center gap-0.5">
                              {Array(5).fill(0).map((_, idx)=> (<img key={idx} src={idx < testimonial.rating ? assets.star_icon : assets.star_dull_icon} className='w-4.5 h-4.5' alt="star"/>))}
                          </div>
                          <p className='text-slate-500 text-sm leading-relaxed my-5 italic'>"{testimonial.content}"</p>
                        </div>
                        <div>
                          <hr className='mb-5 border-slate-100' />
                          <div className='flex items-center gap-3.5'>
                              <img src={testimonial.image} className='w-10 h-10 object-cover rounded-full border border-slate-100 shadow-sm' alt='' />
                              <div className='min-w-0'>
                                  <h3 className='font-bold text-slate-800 text-sm truncate'>{testimonial.name}</h3>
                                  <p className='text-xs text-slate-400 font-medium mt-0.5 truncate'>{testimonial.title}</p>
                              </div>
                          </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial