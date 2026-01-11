import React from 'react'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useContext } from 'react'


export const ListBookings = () => {

    const { bookings } = useContext(MoviesContext)
    return (
        <div className='max-w-[1000px] mt-5 ml-0 sm:ml-5'>
            <p className='text-2xl'>BOOKINGS LIST</p>
            <table className='w-full mt-6 rounded-md border-collapse'>
                <thead className=''>
                    <tr className='bg-[var(--primary-color)]/20 text-left  '>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5'>Booking ID</th>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5'>Date</th>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5'>Time</th>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5 hidden sm:block'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((item , index) => {
                            return (
                                <tr key={index} className={`${index%2 === 0 ? 'bg-[var(--primary-color)]/10' : 'bg-[var(--primary-color)]/15'}`}>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5'>{item.bookingId}</td>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5 hidden min-[350px]:block'>{item.date}</td>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5 block min-[350px]:hidden'>{item.date.slice(0,-5)}</td>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5'>{item.time}</td>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5 hidden sm:block'>${item.total}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}


