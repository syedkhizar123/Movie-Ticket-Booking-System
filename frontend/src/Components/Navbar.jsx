import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from "../assets/assets.js"
import { Menu, X, User2 } from "lucide-react"
import { AuthContext } from '../Contexts/AuthContext.jsx'

export const Navbar = () => {

    const { loginStatus } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const location = useLocation()
    useEffect(() => {
        setOpen(false)
    }, [location.pathname])
    return (
        <>
            {open && (
                <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xl">

                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-5 right-5 text-white"
                    >
                        <X size={30} />
                    </button>


                    <div className="h-full w-full flex flex-col items-center justify-center gap-10 text-white text-xl">
                        <NavLink className={({ isActive }) => `${isActive ? "text-[var(--primary-color)] font-semibold" : "text-white"}`} to="/"  >Home</NavLink>
                        <NavLink className={({ isActive }) => `${isActive ? "text-[var(--primary-color)] font-semibold" : "text-white"}`} to="/movies" >Movies</NavLink>
                        <NavLink className={({ isActive }) => `${isActive ? "text-[var(--primary-color)] font-semibold" : "text-white"}`} to="/upcoming">Releases</NavLink>
                        <NavLink to="/admin/dashboard">Admin</NavLink>
                    </div>

                </div>
            )}


            <div className='z-10 h-15 flex items-center justify-between px-5 mt-5 w-[98%] sm:w-[85%] absolute left-1/2 -translate-x-1/2 '>
                <div className=''>
                    <img src={assets.logo} alt="" />
                </div>
                <div className='flex gap-3 h-13 w-max-content px-5 pt-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full shadow-lg hidden md:flex '>
                    <NavLink className={({ isActive }) => `mx-2 ${isActive ? "text-[var(--primary-color)] font-semibold" : "text-white"}`} to="/"> Home </NavLink>
                    <NavLink className={({ isActive }) => `mx-2 ${isActive ? "text-[var(--primary-color)] font-semibold" : "text-white"}`} to="/movies"> Movies </NavLink>
                    <NavLink className={({ isActive }) => `mx-2 ${isActive ? "text-[var(--primary-color)] font-semibold" : "text-white"}`} to="/upcoming"> Releases </NavLink>
                    <NavLink className="mx-2" to="/admin/dashboard"> Admin </NavLink>

                </div>
                <div className='flex  items-center gap-2'>
                    {
                        loginStatus ?
                            (
                                <NavLink to="/my-bookings"><button className='bg-gray-800 text-white rounded-full px-2 py-2 cursor-pointer'> <User2 size={20} /> </button></NavLink>
                            ) : (
                                <NavLink to="/login"><button className='bg-[var(--primary-color)] text-white rounded-full px-5 py-2 hover:bg-[var(--secondary-color)] cursor-pointer'> Login </button></NavLink>

                            )
                    }
                    <button onClick={() => setOpen(true)} className='ms-1 block md:hidden'> <Menu size={30} /> </button>
                </div>
            </div>
        </>
    )
}

