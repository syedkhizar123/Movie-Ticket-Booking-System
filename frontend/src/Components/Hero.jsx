import React from 'react'
import { assets } from '../assets/assets'
import { Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Hero = () => {
    return (
        <>
            <div className='h-screen w-full bg-cover bg-center flex items-center'
                style={{ backgroundImage: `url(${assets.backgroundImage})` }}>
                <div className='w-[90%] sm:w-[80%] mx-auto '>
                    <div className='w-[100%] max-w-[450px] h-max-content flex flex-col gap-3'>
                        <div>
                            <img src={assets.marvelLogo} />
                        </div>
                        <div>
                            <p className='text-5xl sm:text-7xl font-semibold'>
                                Guardians <br />
                                of the Galaxy
                            </p>
                        </div>
                        <div className='flex gap-3'>
                            <p className='text-gray-300 text-sm sm:text-base'>Action | Adventure | Sci-Fi</p>
                            <p className='text-gray-300 flex gap-1 text-sm sm:text-base'><Calendar className='block sm:hidden' size={17} /> <Calendar className='hidden sm:block' size={20} />2018</p>
                            <p className='text-gray-300 flex gap-1 text-sm sm:text-base'><Clock className='block sm:hidden' size={17} /> <Clock className='hidden sm:block' size={20} />2h 8m</p>
                        </div>
                        <div>
                            <p className='text-gray-300'>
                                In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
                            </p>
                        </div>
                        <div>
                            <Link to="/movies">
                                <button className='bg-[var(--primary-color)] text-white rounded-full px-5 py-2 hover:bg-[var(--secondary-color)] cursor-pointer'>
                                    Explore Movies
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


