import React from 'react'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useContext } from 'react'

export const ListShows = () => {

    const { allMovies } = useContext(MoviesContext)
    const { bookings } = useContext(MoviesContext)
    return (
        <div className='max-w-[1000px] mt-5 ml-0 sm:ml-5'>
            <p className='text-2xl '>SHOWS LIST</p>
            <table className='w-full mt-6 rounded-md border-collapse'>
                <thead className=''>
                    <tr className='bg-[var(--primary-color)]/20 text-left  '>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5'>Movie ID</th>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5 hidden sm:block'>Name</th>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5'>Bookings</th>
                        <th className='py-2 text-sm sm:text-base pl-2 sm:pl-5'>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allMovies.map((item, index) => {
                            const thisMovieBookings = bookings.filter((item2) => (item2.movie == item.id))
                            const revenue = thisMovieBookings.reduce((total, booking) => {
                                return total + booking.total
                            }, 0)
                            return (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-[var(--primary-color)]/10' : 'bg-[var(--primary-color)]/15'}`}>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5'>{item.id}</td>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5 hidden sm:block'>{item.title}</td>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5'>{thisMovieBookings.length}</td>
                                    <td className='py-2 text-xs sm:text-sm pl-2 sm:pl-5'>${revenue}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

