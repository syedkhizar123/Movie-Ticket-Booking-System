import React from 'react'
import { BookingsComponent } from '../Components/Bookings'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Bookings = () => {

    const { movies } = useContext(MoviesContext)
    const { myBookings } = useContext(MoviesContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(myBookings)
    }, [myBookings])

    useEffect(() => {
        const token = localStorage.getItem('cinema_app_token')
        if (!token) {
            navigate('/')
        }
    }, [])


    if (!myBookings) {
        return (
            <div className='min-h-[60vh]'>
                <h1 className='text-lg font-bold pt-30 w-[98%] sm:w-[85%] mx-auto max-w-[1320px] px-5'>My Bookings</h1>
                <div className='pt-30 text-lg mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'><Loader className='animate-spin' /> </div>
            </div>
        )


    }

    if (myBookings.length === 0) {
        return (
            <div className='min-h-[60vh]'>
                <h1 className='text-lg font-bold pt-30 w-[98%] sm:w-[85%] mx-auto max-w-[1320px] px-5'>My Bookings</h1>
                <div className='pt-30 text-lg mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'>No bookings</div>
            </div>
        )

    }
    if (!movies || movies.length === 0) {
        return (
            <div className='min-h-[60vh]'>
                <h1 className='text-lg font-bold pt-30 w-[98%] sm:w-[85%] mx-auto max-w-[1320px] px-5'>My Bookings</h1>
                <div className='pt-30 text-lg mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'><Loader className='animate-spin' /> </div>
            </div>
        )

    }

    return (
        <>
            <div className='min-h-[60vh]'>
                <h1 className='text-lg font-bold pt-30 w-[98%] sm:w-[85%] mx-auto max-w-[1320px] px-5'>My Bookings</h1>
                {

                    myBookings.map((item, index) => {

                        const currentMovie = movies.find((movie) => { return movie.id === item.movie })

                        return (
                            <React.Fragment key={index}>
                                <BookingsComponent img={currentMovie.poster_path} title={currentMovie.title} genre1={currentMovie.genres[0].name} genre2={currentMovie.genres[1].name} runtime={currentMovie.runtime} date={item.date} time={item.time} tickets={item.seats.length} price={item.total} link={`/my-bookings/${item.bookingId}`} />
                            </React.Fragment>
                        )
                    })
                }

            </div>
        </>
    )
}

