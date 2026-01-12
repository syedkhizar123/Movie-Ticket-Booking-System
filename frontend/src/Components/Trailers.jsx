import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import { Play } from 'lucide-react'


export const Trailers = () => {

    const [activeTrailer, setActiveTrailer] = useState(dummyTrailers[0])
    const [play, setPlay] = useState(false)
    // console.log(activeTrailer.videoUrl)
    return (
        <>
            

            <div className='w-[90%] lg:w-[80%] h-[700px] mx-auto max-w-[1000px] flex flex-col gap-3 mt-20'>
                {!play ? (<>
                    <div className='h-[75%] mx-auto w-[95%] rounded bg-cover bg-center relative' style={{ backgroundImage: `url(${activeTrailer.image})` }}>
                        <button
                            onClick={() => setPlay(true)}
                            className='absolute inset-0 flex items-center justify-center'
                        >
                            <div className='h-16 w-16 rounded-full bg-black/60 flex items-center justify-center hover:scale-110 transition'>
                                <Play />
                            </div>
                        </button>
                    </div>

                </>
                ) : (
                    <ReactPlayer

                        controls={false}
                        url={activeTrailer.videoUrl}
                        height="100%"
                        width="100%"

                    />


                )}
                {/* // <div className='h-[75%] mx-auto w-[95%] rounded bg-cover bg-center' style={{ backgroundImage: `url(${activeTrailer})` }}>  </div> */}


                <div className='h-[25%] w-[95%] mx-auto flex justify-between gap-2'>
                    {dummyTrailers.map((trailer, index) => {
                        return (
                            <div key={index} onClick={() => { setActiveTrailer(trailer) }} className='h-35 w-[25%] bg-cover bg-center rounded' style={{ backgroundImage: `url(${trailer.image})` }}>

                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}


