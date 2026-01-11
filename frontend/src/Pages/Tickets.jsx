import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Ticket } from '../Components/Ticket'
import { MoviesContext } from '../Contexts/MoviesContext'
import { useContext } from 'react'
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Loader } from 'lucide-react'

export const Tickets = () => {

    const Backend_URL = import.meta.env.VITE_Backend_URL
    const { movies } = useContext(MoviesContext)
    const { myBookings } = useContext(MoviesContext)
    const { bookingId } = useParams();
    const [currentBooking, setCurrentBooking] = useState(null)

    const [loading, setLoading] = useState(true)

    const filter = () => {
        const filtered = myBookings.find(
            (item) => item.bookingId === bookingId
        )
        setCurrentBooking(filtered)
    }

    useEffect(() => {
        if (movies.length > 0 && currentBooking) {
            const currentMovie = movies.find((movie) => { return movie.id === currentBooking.movie })
            if (currentMovie) {
                setLoading(false)
            }
        }
    } , [currentBooking , movies])



    const downloadTickets = async () => {
        const ticketElements = document.querySelectorAll(".ticket");

        for (let i = 0; i < ticketElements.length; i++) {
            const ticket = ticketElements[i];

            const canvas = await html2canvas(ticket, {
                scale: 2,
                useCORS: true,
                allowTaint: false
            })
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Ticket-${i + 1}.pdf`);
        }
    };

    useEffect(() => {
        filter()
    }, [bookingId, myBookings])

    if (loading) {
        return (
            <div className='pt-30 text-lg mx-auto w-[90%] h-100 sm:w-[80%] max-w-[1320px] flex justify-center items-center'><Loader className='animate-spin' /> </div>
        )
    }


    if (!currentBooking) {
        return <h1 className='pt-30 text-lg mx-auto w-[90%] sm:w-[80%] max-w-[1320px]'>Booking not found</h1>
    }

    return (
        <>
            <div >
                <h1 className='text-lg font-bold pt-30 w-[98%] sm:w-[85%] mx-auto max-w-[1320px] px-5'>Tickets</h1>
                {

                    currentBooking.seats.map((seat, index) => {
                        const currentMovie = movies.find((movie) => { return movie.id === currentBooking.movie })

                        if (!currentMovie) {
                            return null
                        }

                        return (

                            <Ticket key={index} img={`${Backend_URL}/image-proxy?url=${encodeURIComponent(currentMovie.poster_path)}`} title={currentMovie.title} language={currentMovie.original_language} genre1={currentMovie.genres[0].name} genre2={currentMovie.genres[1].name} date={currentBooking.date} time={currentBooking.time} seat={seat} id={currentMovie.id} />
                        )
                    })


                }
                <div className='mx-auto w-[90%] sm:w-[80%] max-w-[1320px] mt-10 flex '>
                    <button onClick={downloadTickets} className='bg-gray-800 px-5 py-2 rounded-full max-[450px]:mx-auto mx-0 max-[450px]:w-[80%]'>
                        Download Tickets
                    </button>
                </div>


            </div>
        </>
    )
}

