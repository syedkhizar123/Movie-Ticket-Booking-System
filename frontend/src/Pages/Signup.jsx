import React from 'react'
import { SignupLogin } from '../Components/SignupLogin'
import { Link } from 'react-router-dom'

export const Signup = () => {
    return (
        <>
            <div className='h-5 w-5 absolute top-3 right-3 text-2xl'>
               <Link to='/'> X </Link> 
            </div>
            <div className='flex items-center justify-center mx-auto h-screen'>
                <SignupLogin title="Signup" text="Already have an account" link="login" />
            </div>
        </>
    )
}
