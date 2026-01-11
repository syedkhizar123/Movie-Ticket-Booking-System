import React, { useContext } from 'react'
import { CheckoutComponent } from '../Components/Checkout'
import { useNavigate, useParams } from 'react-router-dom'
import { MoviesContext } from '../Contexts/MoviesContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'


export const Checkout = () => {

    const { myBookings , setMyBookings } = useContext(MoviesContext)
    // const { bookings , setBookings} = useContext(MoviesContext)
    const { getBookings} = useContext(MoviesContext)
    const { getMyBookings} = useContext(MoviesContext)
    const navigate = useNavigate()
    const Backend_URL = import.meta.env.VITE_Backend_URL
    const { movies } = useContext(MoviesContext)
    const { id } = useParams()
    const { date } = useParams()
    const { time } = useParams()
    const { seats } = useParams()
    const seatsArray = seats.split(',')

    const movie = movies.find((item) => (item.id == id))
    console.log(movie)

    const bookMovie = async () => {
        try {

            const token = localStorage.getItem('cinema_app_token')
            const response = await fetch(`${Backend_URL}/bookings/bookMovie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    movie: id,
                    date,
                    time,
                    seats: seatsArray,
                    total: seatsArray.length * movie.price

                })
            })

            const data = await response.json()

            if (response.status !== 200) {
                return toast.error(data.message)
            } else {
                toast.success(data.message)
                getBookings()
                // try {
                //     const response = await fetch(`${Backend_URL}/bookings/getMyBookings`, {
                //         method: "GET",
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': 'Bearer ' + localStorage.getItem('cinema_app_token')
                //         }
                //     })

                //     const data = await response.json()

                //     if (response.status !== 200) {
                //         console.log(data.message)
                //     } else {
                //         // console.log(data)
                //         setMyBookings(data.myBookings)
                        
                //     }
                // } catch (error) {
                //     console.log(error)
                // }
                getMyBookings()
                navigate('/my-bookings')
            }

        } catch (error) {
            return toast.error(error.message)
        }
    }

    const filterShow = movies.filter((show) => show.id === parseInt(id))

    if (!filterShow.length || !movies.length) {
        return (
            <h1 className="pt-30 text-lg mx-auto w-[90%]">
                Loading ticket...
            </h1>
        );
    }

    return (
        <>
            <div>
                <h1 className='text-lg font-bold pt-30 w-[98%] sm:w-[85%] mx-auto max-w-[1320px] px-5'>Almost Done!</h1>

                <CheckoutComponent img={filterShow[0].poster_path} title={filterShow[0].title} language={filterShow[0].original_language} rating={filterShow[0].vote_average.toFixed(1)} runtime={filterShow[0].runtime}
                    genre1={filterShow[0].genres[0].name} genre2={filterShow[0].genres[1].name} date={date} time={time} seats={seats} tickets={seats.split(',').length} total={seats.split(',').length * 150} handlebooking={bookMovie}
                />
            </div>
        </>
    )
}

