import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useMemo } from 'react'


export const DateBox = () => {


    const [selectedDate, setSelectedDate] = useState(null)
    const { movies } = useContext(MoviesContext)
    const { id } = useParams()
    const navigate = useNavigate("")

    let dates = useMemo(() => {
        const filterMovie = movies.find(item => item.id == id);

        if (filterMovie?.date?.length) {
            const uniqueDates = [...new Set(filterMovie.date.map(d => d.date))];

            return uniqueDates.map(fullDate => {
                const [date, month, year] = fullDate.split('-');

                return {
                    date,
                    month,
                    year
                };
            });
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return Array.from({ length: 4 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + i + 1);

            return {
                date: d.getDate().toString(),
                month: months[d.getMonth()],
                year: d.getFullYear().toString()
            };
        });

    }, [movies, id]);




    const handleDateSelection = (e, date, month, year) => {
        document.querySelectorAll(".date-div").forEach((div) => {
            div.style.backgroundColor = "transparent"
        })
        if (selectedDate !== date + month) {
            setSelectedDate(date + "-" + month + "-" + year)
            e.currentTarget.style.backgroundColor = "var(--primary-color)"
        } else {
            setSelectedDate(null)
            e.currentTarget.style.backgroundColor = "transparent"
        }
    }

    const navigateToSeats = () => {
        if (!selectedDate) {
            toast.error("Please select a date first")
        } else {
            navigate(`/movie/${id}/${selectedDate}`)
        }
    }


    return (
        <>
            <div className='w-[95%] sm:w-[80%] max-w-[1320px] mx-auto h-70 sm:h-50 rounded bg-white/10 backdrop-blur-md border border-white/30 shadow-lg mt-20'>
                <p className='tet-white text-lg font-semibold w-[90%] sm:w-[85%] mx-auto mt-7'>Choose Date</p>
                <div className='flex flex-col sm:flex-row justify-between w-[90%] sm:w-[80%] mx-auto mt-10 items-center gap-10 sm:gap-0'>
                    <div className='w-[280px] flex justify-between gap-2 items-center'>
                        <ChevronLeft />
                        <div className='flex gap-4 overflow-x-auto no-scrollbar w-[240px] pb-1 justify-start'>
                            {
                                dates.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className='border-1  border-[var(--primary-color)] rounded py-2 px-4 flex flex-col  cursor-pointer date-div' onClick={(e) => { handleDateSelection(e, item.date, item.month, item.year) }}>
                                                <span className='mx-auto'>{item.date}</span>
                                                <span className='mx-auto'>{item.month}</span>
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                        <ChevronRight />
                    </div>
                    {/* <Link to={`/movie/${id}/${selectedDate}`}> */}
                    <button onClick={() => { navigateToSeats() }} className='bg-[var(--primary-color)]  max-h-10 mx-auto sm:mx-0 text-white rounded px-5 py-2 cursor-pointer hover:bg-[var(--secondary-color)]'>
                        Book Now
                    </button>
                    {/* </Link> */}
                </div>
            </div>
        </>
    )
}

