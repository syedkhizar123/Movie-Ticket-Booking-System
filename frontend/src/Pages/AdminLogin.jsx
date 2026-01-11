import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AdminAuthContext } from '../Contexts/AdminAuthContext'
import { useContext } from 'react'

export const AdminLogin = () => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setLoginStatus } = useContext(AdminAuthContext)
    const navigate = useNavigate()

    const handleLogin = () => {
        if(!email.trim() || !password.trim()){
            toast.error("Fill all fields")
        } else {
            if(email !== "admin@gmail.com" || password !== "admin123"){
                toast.error("Invalid credentials")
            } else {
                toast.success("Login Successful")
                navigate('/admin/dashboard')
                setLoginStatus(true)
            }
        }
    }

    return (
        <>
            <div className='flex items-center justify-center mx-auto h-screen'>

                <div className='h-105 max-w-[450px] w-[95%] bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-lg flex flex-col gap-5'>
                    <p className='capitalize text-center text-3xl text-white mt-10'>Admin Login</p>
                    <div className='flex flex-col gap-2 w-[80%] min-w-[280px] mx-auto'>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} id='email' name='email' type="email" placeholder='Enter your email' className='pl-2 h-10 border-1 rounded-lg border-[var(--primary-color)]' />
                    </div>
                    <div className='flex flex-col gap-2 w-[80%] min-w-[280px] mx-auto'>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} id='password' name='password' type="password" placeholder='Enter your password' className='pl-2 h-10 border-1 rounded-lg border-[var(--primary-color)]' />
                    </div>
                    <button onClick={handleLogin} className='mt-5 bg-[var(--primary-color)] text-white rounded-full px-5 py-2 hover:bg-[var(--secondary-color)] cursor-pointer w-[80%] mx-auto'> {loading ? (<Loader2 className='mx-auto animate-spin' />) : 'Login'} </button>
                    <p className='w-[max-content] mx-auto'>Back to <Link className='font-semibold' to={`/admin/dashboard`}> Admin Dashboard</Link></p>

                </div>
            </div>
        </>
    )
}

