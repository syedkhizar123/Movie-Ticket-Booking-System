import React from 'react'
import { Link } from 'react-router-dom'

export const BookingsComponent = ({ img, title, genre1, genre2, runtime, date, time, link, price, tickets }) => {
    return (
        <div className='w-[100%] sm:w-[85%] mx-auto max-w-[1320px] px-0 md:px-5 '>
            <div className='mt-5 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[75%] max-w-[700px]  mx-auto md:mx-0 border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 h-40 max-[410px]:h-32 flex items-center justify-between pr-2  gap-2'>
                <div className='flex gap-3 items-center'>
                    <img src={img} className='h-38 max-[410px]:h-30 ml-1 rounded-lg' />
                    <div className='flex flex-col justify-between h-30 max-[410px]:h-25 '>
                        <div className='flex flex-col gap-1'>
                            <p className='font-semibold text-md max-[410px]:text-sm text-white capitalize '>{title}</p>
                            <p className='text-xs capitalize text-gray-300'>{genre1} | {genre2}</p>
                            <p className='text-xs text-gray-300'>{runtime}</p>
                        </div>
                        <div>
                            <p className='text-sm max-[410px]:text-xs text-gray-300'>{date} <br /> {time}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 mr-2 sm:mr-10'>
                    <p className='text-lg max-[410px]:text-sm font-semibold'>${price}</p>
                    <p className='text-sm max-[410px]:text-xs text-gray-300'> Total Tickets: <span className='text-white text-sm'>{tickets}</span></p>
                    <Link to={link}>
                        <button className='bg-[var(--primary-color)] text-white w-full rounded px-5 py-2 hover:bg-[var(--secondary-color)] cursor-pointer'>
                            Tickets
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}



