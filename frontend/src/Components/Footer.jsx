import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
    return (
        <>
            <div className='w-[98%] sm:w-[85%] flex flex-col lg:flex-row justify-between mx-auto px-5 mt-20 mb-10 border-b border-white pb-10'>
                <div className='flex flex-col gap-7  w-[100%] lg:w-[40%] text-start'>
                    <img className='h-7 w-[150px]' src={assets.logo} />
                    <p className='text-gray-300 text-sm'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className='flex gap-3'>
                        <img className='h-10' src={assets.googlePlay} />
                        <img className="h-10" src={assets.appStore} />
                    </div>
                </div>
                <div className='flex gap-3 w-[100%] lg:w-[40%] justify-start gap-5 lg:gap-0 lg:justify-around mt-10 lg:mt-0'>
                    <div>
                        <p className='text-white font-semibold mb-5'>Company</p>
                        <p className='text-gray-300 text-sm mb-2'>Home</p>
                        <p className='text-gray-300 text-sm mb-2'>About Us</p>
                        <p className='text-gray-300 text-sm mb-2'>Contact Us</p>
                        <p className='text-gray-300 text-sm mb-2'>Privacy Policy</p>

                    </div>
                    <div>
                        <p className='text-white font-semibold mb-5'>Get in touch</p>
                        <p className='text-gray-300 text-sm mb-2'>+1-234-567-890</p>
                        <p className='text-gray-300 text-sm mb-2'>Contact@example.com</p>

                    </div>
                </div>
            </div>
        </>
    )
}

