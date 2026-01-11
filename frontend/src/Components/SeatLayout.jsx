import React, { useEffect, useState, useContext } from 'react'
import { Clock } from 'lucide-react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { MoviesContext } from '../Contexts/MoviesContext'
import { AuthContext } from '../Contexts/AuthContext'
import { useMemo } from 'react'

export const SeatLayout = () => {

    const { loginStatus } = useContext(AuthContext)
    const { movies } = useContext(MoviesContext)
    const navigate = useNavigate()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
    const [filteredBookings, setFilteredBookings] = useState([])
    const [bookedSeats, setBookedSeats] = useState([])
    const { date } = useParams()
    const { id } = useParams()
    const { bookings } = useContext(MoviesContext)

    const time = useMemo(() => {
        const currentMovie = movies.find(item => item.id == id)

        if (!currentMovie) {
            return ["12:30 PM", "3:30 PM", "9:30 PM"]
        }

        if (!currentMovie?.date?.length) {
            return ["12:30 PM", "3:30 PM", "9:30 PM"]
        }
        else {
            return currentMovie.date
                .filter(item => item.date == date)
                .map(item => item.time)
        }
    }, [movies, id, date])

    const seats = [
        ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
        ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
        ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
        ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
        ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"],
        ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"],
        ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"],
        ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"],
        ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"],
        ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9"],
        ["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9"],
        ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9"],
        ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"],
        ["N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "N9"]
    ]



    const filter = () => {
        const filtered = bookings.filter((item) => {
            return item.movie == id && item.date == date
        })
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setSelectedSeats([])
        document.querySelectorAll(".h-8").forEach((div) => {
            div.style.backgroundColor = "transparent"
        })
    }, [selectedTime])

    useEffect(() => {
        if (bookings.length) {
            filter()
            // console.log(bookings)
        }
    }, [bookings])

    const handleTimeSelection = (e) => {
        document.querySelectorAll(".time-div").forEach((div) => {
            div.style.backgroundColor = "transparent"
        })
        if (!loginStatus) {
            return toast.error('Login to proceed')
        }
        if (selectedTime !== e.target.innerText) {
            const time = e.currentTarget.innerText
            setSelectedTime(e.currentTarget.innerText)
            e.currentTarget.style.backgroundColor = "var(--primary-color)"
            e.target.style.borderColor = "var(--primary-color)"
            filteredBookings.map((item) => {
                if (item.time === time) {
                    item.seats.map((seat) => {
                        setBookedSeats((prev) => [...prev, seat])
                    })
                } else {
                    setBookedSeats([])
                }
            })
        } else {
            setSelectedTime(null)
            e.currentTarget.style.backgroundColor = "transparent"
            setBookedSeats([])

        }
    }


    const handleSeatSelection = (e) => {
        if (!loginStatus) {
            return toast.error('Login to proceed')
        }
        if (!selectedTime) {
            return toast.error("Please select time first")
        }
        if (selectedSeats.includes(e.target.innerText)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== e.target.innerText))
            e.target.style.backgroundColor = "transparent"
        } else {
            if (selectedSeats.length === 5) {
                toast.error("You can select maximum 5 seats")
            } else {
                setSelectedSeats([...selectedSeats, e.target.innerText])
                e.target.style.backgroundColor = "var(--primary-color)"
            }

        }
    }

    const handleCheckOut = () => {
        if (!loginStatus) {
            return toast.error('Login to proceed')
        }
        if (selectedSeats.length === 0) {
            toast.error("Please select seats first")
        } else {
            toast.success("Proceeding to checkout")
            navigate(`/checkout/${id}/${date}/${selectedTime}/${selectedSeats.join(",")}`)

        }
    }



    return (
        <>
            <div className='flex flex-col lg:flex-row w-[95%] sm:w-[85%] mx-auto pt-30 lg:pt-40 gap-5 max-w-[1320px]'>
                <div className='w-[100%] lg:w-[30%] h-[max-content] flex justify-center'>
                    <div className='bg-white/10 backdrop-blur-md h-max-content py-5 w-60 rounded-lg  border-white shadow-lg flex flex-col justify-center gap-3 pl-5'>
                        <span className='text-md font-semibold'>
                            Available Timings
                        </span>
                        {
                            time.map((item, index) => {
                                return (
                                    <div key={index} className='time-div border border-transparent rounded-lg time-div cursor-pointer' onClick={(e) => handleTimeSelection(e)}>
                                        <span className='flex gap-2 py-3 pl-2'>
                                            <Clock />
                                            {item}
                                        </span>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className='w-[100%] lg:w-[70%] h-[max-content] flex flex-col gap-1'>
                    <p className='text-2xl font-bold mx-auto'>Select Your Seat</p>
                    <img className='mt-3 w-[90%] sm:w-[80%] mx-auto' src={assets.screenImage} />
                    <p className='text-sm uppercase text-gray-300 mx-auto'>SCREEN SIDE</p>
                    <div className='flex flex-col gap-5 mt-10'>
                        <div className='flex flex-row lg:flex-col justify-between w-[95%] mx-auto gap-3'>
                            <div className='flex gap-2 flex-wrap justify-center'>
                                {
                                    seats[0].map((item, index) => {
                                        let selected;
                                        if (bookedSeats.includes(item)) {
                                            selected = true
                                        }
                                        return (
                                            <div onClick={(e) => {
                                                selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                            }}
                                                key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className='flex gap-2 flex-wrap justify-center'>
                                {
                                    seats[1].map((item, index) => {
                                        let selected;
                                        if (bookedSeats.includes(item)) {
                                            selected = true
                                        }
                                        return (
                                            <div onClick={(e) => {
                                                selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                            }}
                                                key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>

                        <div className='flex justify-between w-[95%] mx-auto mt-5 gap-3'>
                            <div className='flex flex-col w-[max-content] lg:w-[45%] mx-0 lg:mx-auto gap-3'>

                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[2].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[3].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col w-[max-content] lg:w-[45%] mx-0 lg:mx-auto gap-3'>

                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[4].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[5].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between w-[95%] mx-auto mt-5 gap-3'>
                            <div className='flex flex-col w-[max-content] lg:w-[45%] mx-0 lg:mx-auto gap-3'>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[6].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[7].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col w-[max-content] lg:w-[45%] mx-0 lg:mx-auto gap-3'>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[8].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[9].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between w-[95%] mx-auto mt-5 gap-3'>
                            <div className='flex flex-col w-[max-content] lg:w-[45%] mx-0 lg:mx-auto gap-3'>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[10].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[11].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col w-[max-content] lg:w-[45%] mx-0 lg:mx-auto gap-3'>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[12].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex gap-2 flex-wrap justify-center'>
                                    {
                                        seats[13].map((item, index) => {
                                            let selected;
                                            if (bookedSeats.includes(item)) {
                                                selected = true
                                            }
                                            return (
                                                <div onClick={(e) => {
                                                    selected ? toast.error("Seat Already Booked") : handleSeatSelection(e)
                                                }}
                                                    key={index} className={`h-8 w-8 flex justify-center items-center border-1 border-[var(--primary-color)] rounded text-xs cursor-pointer ${selected ? ' opacity-50 ' : ''}`}>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => { handleCheckOut() }} className='bg-[var(--primary-color)] text-white rounded-full px-5 py-2 w-[max-content] mt-10 mx-auto mb-10 cursor-pointer'>
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </>
    )
}






