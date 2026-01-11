import React from 'react'
import { Link } from 'react-router-dom'
import { MovieCard } from '../Components/MovieCard'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Star } from 'lucide-react'

export const Upcoming = () => {

    const { upcoming } = useContext(MoviesContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (upcoming.length > 0) {
            setLoading(false)
        }
    }, [upcoming])

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
                <p className='text-white font-semibold text-lg'>Upcoming Movies</p>
                <div className='mt-10  flex flex-wrap gap-3 justify-center'>
                    {
                        upcoming.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                      <div className='h-max-content w-63 rounded-xl bg-gray-800 flex flex-col gap-3 mx-auto pt-2 mb-5 pb-5 my-2 cursor-pointer'>
                                            <img className='h-70 w-60 mx-auto rounded-xl ' src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} />
                                            <div className='w-[90%] mx-auto flex justify-between pr-2'><p className='text-lg font-semibold overflow-x-auto no-scrollbar whitespace-nowrap mr-3'>{item.title}</p>
                                              <div className='flex gap-1 items-center'>
                                                <Star size={17} className="text-[var(--primary-color)]" fill='currentColor' />
                                                <p className='text-md'>{item.vote_average.toFixed(1)}</p>
                                              </div></div>
                                            <div className='w-[90%] mx-auto'><p className='text-sm text-gray-300'>{item.release_date.split('-')[0]} . Horror | Mystery . 1h 42m</p></div>
                                           
                                          </div>
                                </React.Fragment>
                                // <MovieCard key={index} img={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} title={item.title} rating={item.vote_average.toFixed(1)} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

