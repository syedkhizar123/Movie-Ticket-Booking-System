import { createContext, useState, useEffect } from "react";
import { dummyShowsData } from "../assets/assets";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const MoviesContext = createContext()

export const MoviesProvider = ({ children }) => {

    const { loginStatus } = useContext(AuthContext)
    const Backend_URL = import.meta.env.VITE_Backend_URL
    const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN
    const [movies, setMovies] = useState([])
    const [allMovies, setAllMovies] = useState([])
    const [bookings, setBookings] = useState([])
    const [myBookings, setMyBookings] = useState([])
    const [upcoming, setUpcoming] = useState([])


    function hasDatePassed(dateStr) {

        const months = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };

        const [day, mon, year] = dateStr.split('-');
        const dateObj = new Date(year, months[mon], day);


        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return dateObj < today;
    }

    const getMovies = async () => {
        try {
            const response = await fetch(`${Backend_URL}/movies/getAllMovies`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            if (response.status !== 200) {
                console.log(data)
            } else {
                // console.log(data)
                setAllMovies(data.allMovies)
                const filteredMovies = data.allMovies.filter(movie => {
                    if (!movie.date || movie.date.length === 0) {
                        return true;
                    }

                    return movie.date.some(dateObj => !hasDatePassed(dateObj.date));
                });

                setMovies(filteredMovies)

            }
        } catch (error) {
            console.log(error)
        }

    }

    const getBookings = async () => {
        try {
            const response = await fetch(`${Backend_URL}/bookings/getbookings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            if (response.status !== 200) {
                console.log(data.message)
            } else {
                setBookings(data.AllBookings)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const getMyBookings = async () => {
        if (loginStatus) {
            try {
                const response = await fetch(`${Backend_URL}/bookings/getMyBookings`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('cinema_app_token')
                    }
                })

                const data = await response.json()

                if (response.status !== 200) {
                    console.log(data.message)
                } else {

                    setMyBookings(data.myBookings.reverse())
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const getUpcomingMovies = async () => {
        try {
            const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_TOKEN}`
                }
            };

            const res = await fetch(url, options);
            const data = await res.json();
            // console.log(data.results)
            setUpcoming(data.results)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMovies()
        getBookings()
        getMyBookings()
        getUpcomingMovies()
    }, [loginStatus])


    return (
        <MoviesContext.Provider value={{ movies, setMovies, bookings, setBookings, myBookings, setMyBookings, getBookings, getMyBookings, allMovies , upcoming , setUpcoming }}>
            {children}
        </MoviesContext.Provider>
    )
}