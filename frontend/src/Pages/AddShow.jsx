import React from 'react'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'
import { Loader } from 'lucide-react'
import { AdminAuthContext } from '../Contexts/AdminAuthContext'
import { useContext } from 'react'

export const AddShow = () => {

    const Backend_URL = import.meta.env.VITE_Backend_URL
    const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [showPrice, setShowPrice] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [allDateTime, setAllDateTime] = useState([])
    const [selectedMovieDetails, setSelectedMovieDetails] = useState(null)
    const [movies, setMovies] = useState([])
    const [runtime, setRuntime] = useState(null)
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)
    const { loginStatus } = useContext(AdminAuthContext)

    const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    }
    const GENRE_MAP = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Fiction",
        53: "Thriller",
        10752: "War",
        37: "Western"
    };
    const LANGUAGE_MAP = {
        en: "English",
        hi: "Hindi",
        ur: "Urdu",
        fr: "French",
        es: "Spanish",
        de: "German",
        it: "Italian",
        ja: "Japanese",
        ko: "Korean",
        zh: "Chinese",
        ru: "Russian",
        ar: "Arabic",
        pt: "Portuguese",
        tr: "Turkish",
        nl: "Dutch",
        sv: "Swedish",
        da: "Danish",
        no: "Norwegian",
        fi: "Finnish",
        pl: "Polish",
        th: "Thai",
        id: "Indonesian",
        ms: "Malay",
        bn: "Bengali",
        ta: "Tamil",
        te: "Telugu",
        ml: "Malayalam",
        kn: "Kannada",
        mr: "Marathi",
        pa: "Punjabi"
    };

    


    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };


    const fetchNowPlayingMovies = async () => {
        const res = await fetch(url, options);
        const data = await res.json();
        return data.results;
    };

    const fetchMovieDetails = async (movieId) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
                headers: {
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                    accept: "application/json",
                },
            }
        );

        const data = await res.json();
        return data;
    };

    const fetchMovieCredits = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_TOKEN}`
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        return data.cast;
    };


    useEffect(() => {
        const loadMovies = async () => {
            const movies = await fetchNowPlayingMovies();
            setMovies(movies);
            setLoading(false)
        };

        loadMovies();
    }, []);

    const handleSelectMovie = (e) => {
        const name = e.currentTarget.innerText.split('\n')[0]
        if (selectedMovie !== name) {
            setSelectedMovie(name)
        } else {
            setSelectedMovie(null)
        }
    }


    const AddTime = () => {
        if (!dateTime) {
            return toast.error('Select date and time')
        } else {
            const exists = allDateTime.find((item) => item.date === dateTime.split('T')[0] && item.time === dateTime.split('T')[1])
            if (exists) {
                toast.error('Time and Date already exists')
            } else {
                let formattedDate;
                let formattedTime;

                const getDate = dateTime.split('T')[0].split('-')
                if (getDate[2].startsWith('0')) {
                    formattedDate = `${getDate[2][1]}-${months[getDate[1]]}-${getDate[0]}`
                } else {
                    formattedDate = `${getDate[2]}-${months[getDate[1]]}-${getDate[0]}`
                }

                const getTime = dateTime.split('T')[1].split(":")
                if (Number(getTime[0]) > 11) {
                    if (Number(getTime[0] == 12)) {
                        formattedTime = getTime[0] + ":" + getTime[1] + " PM"
                    } else {
                        formattedTime = getTime[0] - 12 + ":" + getTime[1] + " PM"
                    }

                } else {
                    if (Number(getTime[0]) > 9) {
                        formattedTime = getTime[0] + ":" + getTime[1] + " AM"
                    } else {
                        if (Number(getTime[0]) < 1) {
                            formattedTime = "12" + ":" + getTime[1] + " AM"
                        } else {
                            formattedTime = getTime[0][1] + ":" + getTime[1] + " AM"
                        }

                    }

                }
                setAllDateTime(prev => [...prev, {
                    date: formattedDate,
                    time: formattedTime
                }])
            }
            setDateTime('')
        }
    }

    const deleteTime = (date, time) => {
        setAllDateTime(prev => prev.filter((item) => !(item.date === date && item.time === time)))
    }

    const addShow = async () => {
        if (!loginStatus) {
            return toast.error('Login as admin to proceed')
        }
        if (!selectedMovie) {
            toast.error('Select a movie')
        } else {
            if (!showPrice) {
                toast.error('Set show price')
            } else {
                if (allDateTime.length === 0) {
                    toast.error('Select date and time')
                } else {
                    try {

                        const response = await fetch(`${Backend_URL}/movies/addMovie`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: selectedMovieDetails.id,
                                title: selectedMovieDetails.title,
                                overview: selectedMovieDetails.overview,
                                poster_path: `https://image.tmdb.org/t/p/original${selectedMovieDetails.poster_path}`,
                                backdrop_path: `https://image.tmdb.org/t/p/original${selectedMovieDetails.backdrop_path}`,
                                genres: selectedMovieDetails.genre_ids.map((item) => ({
                                    name: GENRE_MAP[item]
                                })),
                                casts: cast,
                                date: allDateTime,
                                release_date: selectedMovieDetails.release_date,
                                original_language: LANGUAGE_MAP[selectedMovieDetails.original_language],
                                vote_average: selectedMovieDetails.vote_average,
                                runtime: `${Math.floor(Number(runtime) / 60)}h ${Number(runtime) % 60}m`,
                                price: showPrice
                            })

                        })

                        const data = await response.json()
                        if (response.status !== 200) {
                            toast.error(data.message)
                            console.log(data)
                        } else {
                            toast.success('Show added')
                            setAllDateTime([])
                            setDateTime('')
                            setShowPrice('')
                            setSelectedMovie(null)
                        }

                    } catch (error) {
                        console.log(error.message)
                    }

                }
            }
        }

    }

    useEffect(() => {
        if (movies.length > 0) {
            setSelectedMovieDetails(movies.find((item) => (item.title == selectedMovie)))
        }
    }, [selectedMovie])

    useEffect(() => {
        if (selectedMovieDetails) {
            const data = async () => {
                const details = await fetchMovieDetails(selectedMovieDetails.id)
                // console.log(details)
                setRuntime(details.runtime)
            }
            const getCast = async () => {
                const cast = await fetchMovieCredits(selectedMovieDetails.id)
                console.log(cast)
                const formattedCast = cast.map(actor => ({
                    name: actor.name,
                    profile_path: actor.profile_path ?
                        `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : `data:image/jpeg;base64,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`
                }));
                setCast(formattedCast)
            }
            data()
            getCast()
        }
        console.log({ selectedMovieDetails })
    }, [selectedMovieDetails])

    useEffect(() => {
        console.log(cast)
    }, [cast])


    return (
        <>
            <div className=' mt-5 ml-0 sm:ml-5'>
                <p className='text-2xl '>ADD SHOWS</p>
                <p className='mt-10 text-xl '>Now Playing</p>
                <div className='flex gap-2 mt-3 overflow-x-auto no-scrollbar'>


                    {
                        loading ? (
                            <div className=' mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'><Loader className='animate-spin' /> </div>

                        ) : (
                            movies.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div onClick={handleSelectMovie} className="h-100 w-50 shrink-0 rounded-md cursor-pointer">

                                            <div className="relative">
                                                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className='h-70 w-50 object-cover rounded-md' />
                                                {selectedMovie === item.title && (
                                                    <div className="absolute top-2 right-2 bg-[var(--primary-color)] text-white w-6 h-6 flex items-center justify-center rounded-md">
                                                        <Check size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="mt-2 ml-2 text-lg whitespace-nowrap overflow-x-auto no-scrollbar mr-1">{item.title}</p>
                                            <div className="flex justify-between">
                                                <p className="mt-2 ml-2 text-gray-300 text-md"> {item.release_date} </p>
                                                <p className="flex gap-1 mt-2 mr-2 text-gray-300 text-md"> <Star size={20} className="text-[var(--primary-color)]" fill="currentColor" /> {item.vote_average.toFixed(1)} </p>
                                            </div>
                                        </div>
                                    </React.Fragment>

                                )
                            }))
                    }
                </div>
                <div className='flex flex-col gap-5 mt-3'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="price" className='text-lg'>Show Price</label>
                        <input type='number' id='price' value={showPrice} onChange={(e) => { setShowPrice(e.target.value) }} name='price' placeholder='$ Enter show price' className='pl-3 py-3 w-[90%] max-w-[280px] border border-gray-300 rounded-md' />
                    </div>

                    <div className='flex max-[500px]:hidden flex-col gap-3 mt-5 mb-5'>
                        <label htmlFor="date" className='text-lg'>Select Date and Time</label>
                        <div className='flex gap-3 border border-gray-300 py-1 rounded-md w-[max-content] px-1'>
                            <input type='datetime-local' value={dateTime} onChange={(e) => { setDateTime(e.target.value) }} id='date' name='date' placeholder='$ Enter show price' className='pl-3 py-3 w-[90%] min-w-[200px] max-w-[280px] border-none border-black rounded-md text-gray-300' />
                            <button onClick={AddTime} className='bg-[var(--primary-color)] rounded-md px-5 py-1 min-w-[120px] cursor-pointer'> Add Time</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 min-[500px]:hidden mt-3 mb-5'>
                        <label htmlFor="date" className='text-lg min-[500px]:hidden'>Select Date and Time</label>
                        <div className='flex gap-3 flex-col min-[500px]:hidden'>
                            <input type='datetime-local' value={dateTime} onChange={(e) => { setDateTime(e.target.value) }} id='date' name='date' placeholder='$ Enter show price' className='pl-3 py-3 w-[90%] max-w-[280px] border border-gray-300 rounded-md text-gray-300' />
                            <button onClick={AddTime} className='bg-[var(--primary-color)] rounded-md px-5 py-2 mt-2 w-[90%] max-w-[280px] cursor-pointer'> Add Time</button>
                        </div>
                    </div>

                    {
                        allDateTime.map((item, index) => {

                            return (
                                <React.Fragment key={index}>
                                    <div className='mb-5 flex flex-col gap-2'>
                                        <p className=' font-semibold w-max-content'>{item.date}</p>
                                        <p className='text-sm p-2 border border-[var(--primary-color)] w-[100px] rounded-md flex justify-between'>{item.time} <X className='cursor-pointer' onClick={() => { deleteTime(item.date, item.time) }} size={22}></X> </p>
                                    </div>
                                </React.Fragment>
                            )


                        })
                    }

                </div>

                <div>
                    <button onClick={addShow} className='rounded-md px-5 py-2 bg-[var(--primary-color)] text-white w-[90%] max-w-[280px] sm:max-w-[200px] mt-4 cursor-pointer'>
                        Add Show
                    </button>
                </div>
            </div>
        </>
    )
}


