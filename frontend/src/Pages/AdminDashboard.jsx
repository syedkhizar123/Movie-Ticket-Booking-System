import { CircleDollarSign, LineChart, PlayCircle, Users } from 'lucide-react'
import React from 'react'
import { Star } from 'lucide-react'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useContext } from 'react'
import { useEffect , useState } from 'react'
import { Loader } from 'lucide-react'


export const AdminDashboard = () => {

    const { movies } = useContext(MoviesContext)
    const { bookings } = useContext(MoviesContext)
    const [loading, setLoading] = useState(true)
    const revenue = bookings.reduce((total, booking) => {
        return total + booking.total
    }, 0)

    useEffect(() => {
        if(movies.length > 0) {
            setLoading(false)
        }
    }, [movies])

    if (loading) {
        return <div className='pt-30 text-lg mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'><Loader className='animate-spin' /> </div>
    }
    return (
        <>
            <div className='max-w-[1200px] mt-5 ml-0 sm:ml-5'>
                <p className='text-2xl '> ADMIN DASHBOARD </p>
                <div className='flex flex-wrap gap-3 mt-5'>
                    <div className='h-20 w-55 rounded-md bg-[var(--primary-color)]/15 border border-[var(--primary-color)]/20 flex justify-between px-4 items-center'>
                        <div className='flex flex-col gap-2'>
                            <p>Total Bookings</p>
                            <p>{bookings.length}</p>
                        </div>
                        <div>
                            <LineChart />
                        </div>
                    </div>
                    <div className='h-20 w-55 rounded-md bg-[var(--primary-color)]/15 border border-[var(--primary-color)]/20 flex justify-between px-4 items-center'>
                        <div className='flex flex-col gap-2'>
                            <p>Total Revenue</p>
                            <p>$ {revenue}</p>
                        </div>
                        <div>
                            <CircleDollarSign />
                        </div>
                    </div>
                    <div className='h-20 w-55 rounded-md bg-[var(--primary-color)]/15 border border-[var(--primary-color)]/20 flex justify-between px-4 items-center'>
                        <div className='flex flex-col gap-2'>
                            <p>Active Shows</p>
                            <p>{movies.length}</p>
                        </div>
                        <div>
                            <PlayCircle />
                        </div>
                    </div>
                    <div className='h-20 w-55 rounded-md bg-[var(--primary-color)]/15 border border-[var(--primary-color)]/20 flex justify-between px-4 items-center'>
                        <div className='flex flex-col gap-2'>
                            <p>Total Users</p>
                            <p>70</p>
                        </div>
                        <div>
                            <Users />
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-3 mt-10'>
                    {
                        movies.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className='h-100 w-50 rounded-md bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20'>
                                        <img className='rounded-md mx-auto mt-1 w-48 h-65' src={item.poster_path} />
                                        <p className='text-white ml-2 text-md mt-3'>{item.title}</p>
                                        <div className='flex justify-between w-[90%] mx-auto mt-1 pr-3'>
                                            <p className='pt-2'>${item.price}</p>
                                            <p className='flex gap-1 mt-3 '><Star size={20} className="text-[var(--primary-color)]" fill='currentColor' /> {item.vote_average.toFixed(1)} </p>
                                        </div>
                                        <p className='text-gray-300 w-[90%] mx-auto text-sm mt-3'>{item.genres[0].name} | {item.genres[1].name} . {item.runtime} </p>
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

