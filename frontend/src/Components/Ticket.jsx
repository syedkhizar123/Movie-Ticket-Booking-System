import React from 'react'
import { QRCodeSVG } from 'qrcode.react';

export const Ticket = ({ img, title, language, genre1, genre2, date, time, seat , id}) => {

    const qrValue = JSON.stringify({
        img,
        title,
        language,
        date,
        time,
        seat,
        id
    });


    return (
        <>
            <div className='w-[100%] sm:w-[85%] mx-auto max-w-[1320px] px-0 md:px-5'>
                <div className='ticket mt-5 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[75%] max-w-[600px]  mx-auto md:mx-0 border rounded-lg bg-white h-33 sm:h-40 flex'>
                    <div className='w-[75%]  h-full rounded-lg flex gap-2 sm:gap-4 items-center pl-1 '>

                        <img src={img} className='h-30 sm:h-37 w-25 max-[360px]:w-20 sm:w-30 rounded-lg' />
                        <div className='flex flex-col justify-between h-30 sm:h-37 py-1'>
                            <p className=' uppercase text-sm sm:text-base text-black'>{title}<br /><span className='text-xs sm:text-sm capitalize'>{genre1} | {genre2}</span></p>
                            <p className='text-xs sm:text-sm capitalize text-black'>{language}</p>
                            <div className='flex flex-col text-black'>
                                <div className='flex gap-2'>
                                    <p className='text-xs'>{date}</p>
                                    <p className='text-xs'>{time}</p>
                                </div>
                                <p className='text-xs text-black'>Carnival Cinemas</p>
                                <p className='text-xs text-black'>Seat No: {seat}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[25%] h-full border-r-rounded-lg flex items-center flex-col gap-2 justify-center border-l-1 border-dashed border-black '>

                        <div className='max-[400px]:hidden'>
                            <QRCodeSVG
                                value={qrValue}
                                size={70}
                                bgColor="#ffffff"
                                fgColor="#000000"
                            />
                        </div>
                        <div className='min-[400px]:hidden'>
                            <QRCodeSVG
                                value={qrValue}
                                size={65}
                                bgColor="#ffffff"
                                fgColor="#000000"
                            />
                        </div>

                        <p className='text-xs text-black'>{seat}-{id}</p>
                    </div>
                </div>
            </div>

        </>
    )
}


