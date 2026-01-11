import { Link } from "react-router-dom"
import { MovieCard } from "../Components/MovieCard"
import { MoviesContext } from "../Contexts/MoviesContext"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Loader } from "lucide-react"

export const Movies = () => {

    const { movies } = useContext(MoviesContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (movies.length > 0) {
            setLoading(false)
        }
    }, [movies])

    if (loading) {
        return (
            <>
                <div className='pt-30 text-lg mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'><Loader className='animate-spin' /> </div>
            </>
        )
    }

    return (
        <>
            <div className='w-[90%]  mx-auto max-w-[1320px] pt-30'>
                <p className='text-white font-semibold text-lg'>Now Showing</p>
                <div className='mt-10  flex flex-wrap gap-3 justify-center'>
                    {
                        movies.map((item, index) => {
                            return (
                                <Link key={index} to={`/movie/${item.id}`}>
                                    <MovieCard img={item.backdrop_path} title={item.title} year={item.release_date.split("-")[0]} genre1={item.genres[0].name} genre2={item.genres[1].name} runtime={item.runtime} rating={item.vote_average.toFixed(1)} price={item.price} />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}