import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AdminAuthContext } from '../Contexts/AdminAuthContext'
import { useContext } from 'react'
import toast from 'react-hot-toast'

export const AdminNavbar = () => {

    const { loginStatus, setLoginStatus } = useContext(AdminAuthContext)

    const handleLogout = () => {
        setLoginStatus(false)
        toast.success('Logged Out')
    }

    return (
        <>
            <div className='h-17 sm:h-20 border-b-gray-600 border w-full flex justify-between px-5 sm:px-10 items-center border-transparent'>
                <img src={assets.logo} className='h-6 sm:h-8 w-35 sm:w-40' />
                {
                    loginStatus ? (
                        <button onClick={handleLogout} className='bg-[var(--primary-color)] text-white rounded-full px-5 py-1 sm:py-2 hover:bg-[var(--secondary-color)] cursor-pointer'>
                            Logout
                        </button>
                    ) : (
                        <NavLink to='/admin/login'>
                            <button className='bg-[var(--primary-color)] text-white rounded-full px-5 py-1 sm:py-2 hover:bg-[var(--secondary-color)] cursor-pointer'>
                                Login
                            </button>
                        </NavLink>
                    )
                }

            </div>
        </>
    )
}

