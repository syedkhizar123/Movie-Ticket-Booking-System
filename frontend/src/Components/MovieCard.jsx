import React from 'react'
import { Star } from 'lucide-react'


export const MovieCard = ({ img, title, year, genre1, genre2, runtime, rating , price}) => {
  return (
    <>
      <div className='h-max-content w-63 rounded-xl bg-gray-800 flex flex-col gap-3 mx-auto pt-2 mb-5 pb-5 my-2'>
        <img className='h-45 w-60 mx-auto rounded-xl ' src={img} />
        <div className='w-[90%] mx-auto flex justify-between pr-2'><p className='text-lg font-semibold overflow-x-auto no-scrollbar whitespace-nowrap mr-3'>{title}</p>
          <div className='flex gap-1 items-center'>
            <Star size={17} className="text-[var(--primary-color)]" fill='currentColor' />
            <p className='text-md'>{rating}</p>
          </div></div>
        <div className='w-[90%] mx-auto'><p className='text-sm text-gray-300'>{year} . {genre1} | {genre2} . {runtime}</p></div>
        <div className='flex justify-between w-[90%] mx-auto mt-2 pr-2'>
          <button className='bg-[var(--primary-color)] text-white rounded-full px-5 py-2 text-sm font-semibold'>
            Buy Tickets
          </button>
          <p className='text-lg mt-1 font-semibold'>${price}</p>
        </div>
      </div>
    </>
  )
}

