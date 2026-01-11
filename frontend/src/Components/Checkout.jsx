import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

export const CheckoutComponent = ({ img, title, language, rating, genre1, genre2, runtime, seats, date, time, total, tickets, handlebooking }) => {

    return (
        <>
            <div className='w-[100%] sm:w-[90%] mx-auto max-w-[1320px] px-0 md:px-5'>
                <div className='mt-5 w-[95%] sm:w-[95%] md:w-[100%]  max-w-[1000px]  mx-auto md:mx-0 border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 h-57 max-[410px]:h-32 flex items-center justify-between pr-2  gap-2 max-[900px]:hidden'>
                    <div className='flex gap-5 items-center'>
                        <img src={img} className='h-55 max-[410px]:h-30 ml-1 rounded-lg' />
                        <div className='flex flex-col justify-start h-50 max-[410px]:h-25 gap-5'>
                            <div className='flex flex-col gap-1'>
                                <p className='font-semibold text-md max-[410px]:text-sm text-white capitalize '>{title}</p>
                                <p className='max-[410px]:text-xs uppercase text-gray-300'>{language}</p>
                                <p className='max-[410px]:text-xs text-gray-300 flex gap-1'><Star size={20} className="text-[var(--primary-color)]" fill='currentColor' /> {rating}</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='max-[410px]:text-xs text-gray-300'>{genre1} | {genre2}</p>
                                <p className='max-[410px]:text-xs text-gray-300'> {runtime} </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 h-50 '>
                        <div className='flex flex-col gap-3'>
                            <p className='flex gap-2'>Cineplex Cinemas</p>
                            <p className='text-gray-300'>Seats : {seats}</p>
                            <p className='text-gray-300 '>{date} <br /> {time}</p>
                        </div>

                    </div>
                    <div className='flex flex-col gap-2 mr-2 sm:mr-10 h-50'>
                        <p className='text-lg max-[410px]:text-sm font-semibold'>${total}</p>
                        <p className='text-sm max-[410px]:text-xs text-gray-300'> Total Tickets: <span className='text-white text-sm'>{tickets}</span></p>
                        {/* <Link to="/my-bookings "> */}
                        <button onClick={handlebooking} className='bg-[var(--primary-color)] text-white w-full rounded px-5 py-2 hover:bg-[var(--secondary-color)] cursor-pointer mt-3'>
                            Confirm Booking
                        </button>
                        {/* </Link> */}
                        <Link to="/">
                            <button className='bg-transparent text-white w-full rounded px-5 py-2 border-1  border-[var(--primary-color)] cursor-pointer'>
                                Cancel Booking
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='mt-5 py-1 max-w-[1000px]  mx-auto md:mx-0 border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 h-[max-content] min-w-[320px] w-[50%] sm:w-[100%]  flex flex-col sm:flex-row justify-start pr-1 sm:pr-2 pl-1  gap-0 sm:gap-7 min-[900px]:hidden items-center'>

                    <img src={img} className='rounded-lg h-80 w-[95%] sm:w-[99%] mx-auto  sm:h-105 sm:w-[auto] sm:mx-0' />
                    <div className='flex flex-col gap-13 mx-auto sm:mx-0 w-[90%] sm:w-[auto]'>
                        <div className='flex flex-col sm:flex-row gap-8 sm:justify-between mt-10  '>
                            <div className='flex flex-col gap-2 h-[max-content]'>
                                <p className='uppercase text-lg'>{title}</p>
                                <p className='text-gray-300'>{genre1} | {genre2}</p>
                                <p className='capitalize text-gray-300 hidden sm:block'>{language}</p>
                                <p className='text-gray-300 hidden sm:block'>2h 10m</p>
                                <p className='flex gap-2 text-gray-300 hidden sm:block'><Star size={20} className="text-[var(--primary-color)]" fill='currentColor' /> {rating} </p>
                                <div className='flex gap-5 sm:hidden'>
                                    <p className='capitalize text-gray-300'>{language}</p>
                                    <p className='text-gray-300'>2h 10m</p>
                                    <p className='flex gap-2 text-gray-300'><Star size={20} className="text-[var(--primary-color)]" fill='currentColor' /> {rating} </p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 h-[max-content]'>
                                <p>
                                    Cineplex Cinemas
                                </p>
                                <p className='text-gray-300'>Seats : {seats}
                                </p>
                                <p className='text-gray-300 flex gap-2 sm:hidden'>{date} at {time}</p>
                                <p className='text-gray-300 hidden sm:block'>{date}</p>
                                <p className='text-gray-300 hidden sm:block'>{time}</p>
                                <p className='text-gray-300'>Total Tickets: <span className=''>{tickets}</span></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mb-2'>
                            <p className='text-2xl font-semibold mb-2'>${total}</p>
                            {/* <Link to="/my-bookings"> */}
                            <button onClick={handlebooking} className='bg-[var(--primary-color)] text-white w-full rounded px-5 py-2 hover:bg-[var(--secondary-color)] cursor-pointer'>
                                Confirm Booking
                            </button>
                            {/* </Link> */}
                            <Link to="/">
                                <button className='mb-2 sm:mb-0 bg-transparent text-white w-full rounded px-5 py-2 border-1  border-[var(--primary-color)] cursor-pointer'>
                                    Cancel Booking
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}


