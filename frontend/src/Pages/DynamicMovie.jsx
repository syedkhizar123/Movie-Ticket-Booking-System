import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { DynamicMovieCard } from '../Components/DynamicMovieCard'
import { DateBox } from '../Components/DateBox'
import { MovieCard } from '../Components/MovieCard'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'

export const DynamicMovie = () => {

    const { movies } = useContext(MoviesContext)
    const { id } = useParams()
    const [movie, setMovie] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        if (movies.length > 0) {
            const getMovie = movies.find((item) => { return item.id === Number(id) })
            setMovie(getMovie)
            setLoading(false)
        }
    }, [id, movies])
    // const movie = movies.find((item) => { return item.id === Number(id) }) 
    const suggestedMovies = movies.filter((item) => {
        return item.id !== Number(id)
    })
    if (loading) {
        return (
            <>
                <div className='pt-30 text-lg mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'><Loader className='animate-spin' /> </div>
            </>
        )
    }

    if (!movie) {
        return (
            <>
                <h1 className='pt-30 text-lg mx-auto w-[90%] sm:w-[80%] max-w-[1320px]'>Movie not found</h1>
            </>
        )
    }
    return (
        <>
            <div className='pt-30  mx-auto w-[90%] sm:w-[80%] max-w-[1320px]'>
                <DynamicMovieCard img={movie.poster_path} language={movie.original_language} title={movie.title} rating={movie.vote_average.toFixed(1)} overview={movie.overview} runtime={movie.runtime} genre1={movie.genres[0].name} genre2={movie.genres[1].name} year={movie.release_date.split('-')[0]} cast={movie.casts} />
            </div>
            <DateBox />
            <p className='text-lg text-white font-semibold mb-10 w-[90%] sm:w-[80%] mx-auto max-w-[1320px] mt-20'>You May Also Like</p>
            <div className='mt-10 flex flex-wrap gap-3 w-[90%] mx-auto max-w-[1200px] justify-center'>
                {
                    suggestedMovies.slice(0, 8).map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Link className='' key={index} to={`/movie/${item.id}`}>
                                    <MovieCard img={item.backdrop_path} title={item.title} genre1={item.genres[0].name} genre2={item.genres[1].name} runtime={item.runtime} rating={item.vote_average.toFixed(1)} price={item.price} />
                                </Link>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}

