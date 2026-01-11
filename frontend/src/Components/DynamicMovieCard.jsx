import React from 'react'
import { Star } from 'lucide-react'
export const DynamicMovieCard = ({ img, language, title, rating, overview, runtime, genre1, genre2, year, cast }) => {
    return (
        <>
            <div className='flex flex-col md:flex-row w-[100%] mx-auto pt-5 md:pt-20 gap-5 justify-center'>
                <div className='w-[100%] md:w-[50%] lg:w-[45%] flex justify-center md:justify-end'>
                    <img className='h-120 w-85 rounded-xl ' src={img} />
                </div>
                <div className='w-[100%] md:w-[50%] lg:w-[55%]'>
                    <p className='text-[var(--primary-color)] text-lg uppercase'>{language}</p>
                    <p className='font-bold text-white text-4xl mt-5'>{title}</p>
                    <p className='flex gap-1 mt-3'><Star size={20} className="text-[var(--primary-color)]" fill='currentColor' /> {rating} User Rating</p>
                    <p className='mt-5 text-gray-500 text-sm' > {overview}</p>
                    <p className='text-white text-md mt-5'>{runtime} . {genre1} , {genre2} . {year}</p>
                    <div className='flex gap-5 mt-7'>
                        <button className='bg-gray-800 text-white rounded-md px-7 py-2 flex gap-2 cursor-pointer hover:bg-gray-900'>
                            Watch Trailer
                        </button>
                        <button onClick={() => { document.getElementById("caste")?.scrollIntoView({ behavior: "smooth" }) }} className='bg-[var(--primary-color)] text-white rounded-md px-7 py-2 cursor-pointer hover:bg-[var(--secondary-color)]' >
                            Buy Tickets
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <p className='text-md font-semibold text-white mb-10'>Movie Cast</p>
                <div id='caste' className='flex gap-5 overflow-x-auto no-scrollbar '>
                    {
                        cast.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className='flex flex-col gap-3 w-[100px] shrink-0 '>
                                        <img src={item.profile_path} className='rounded-full h-20 w-20 object-cover mx-auto' />
                                        <span className='text-xs mx-auto text-center'>{item.name}</span>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

