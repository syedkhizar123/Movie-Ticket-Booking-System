import React from 'react'
import { LayoutDashboardIcon } from 'lucide-react'
import { PlusSquare } from 'lucide-react'
import { List } from 'lucide-react'
import { ListTodo } from 'lucide-react'
import { Camera } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const AdminSidebar = () => {
    return (
        <>
            <div className='w-20 md:w-60 min-h-[calc(100vh-4.25rem)] border-l-transparent  sm:min-h-[calc(100vh-5rem)] border border-r border-gray-600 border-t-0 border-b-0 flex flex-col gap-8'>
                <div className='flex items-center mt-5 flex-col gap-2'>
                    <img className='mx-auto rounded-full h-10 md:h-13 ' src='https://quickshow.vercel.app/assets/profile-CXhnMaZT.png' />
                    <p className='text-white font-semibold'>Admin</p>
                </div>

                <div className='flex flex-col gap-3'>
                    <NavLink to='/admin/dashboard' className={({ isActive }) => `block py-2  transition ${isActive ? 'bg-[var(--primary-color)]/15 text-[var(--primary-color)]' : 'text-gray-400 bg-transparent'}`}
                    >
                        <div className='w-full flex gap-2 md:pl-15 '>
                            <LayoutDashboardIcon className='mx-auto md:mx-0' /> <span className='hidden md:block'> Dashboard </span>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/add" className={({ isActive }) => `block py-2  transition ${isActive ? 'bg-[var(--primary-color)]/15 text-[var(--primary-color)]' : 'text-gray-400 hover:bg-transparent'}`}>
                        <div className='w-full flex gap-2 md:pl-15'>
                            <PlusSquare className='mx-auto md:mx-0' /> <span className='hidden md:block'> Add Shows </span>
                        </div>
                    </NavLink>
                    <NavLink to='/admin/showsList' className={({ isActive }) => `block py-2  transition ${isActive ? 'bg-[var(--primary-color)]/15 text-[var(--primary-color)]' : 'text-gray-400 bg-transparent'}`}>
                        <div className='w-full flex gap-2 md:pl-15'>
                            <List className='mx-auto md:mx-0' /> <span className='hidden md:block'> List Shows </span>
                        </div>
                    </NavLink>
                    <NavLink to='/admin/bookingsList' className={({ isActive }) => `block py-2  transition ${isActive ? 'bg-[var(--primary-color)]/15 text-[var(--primary-color)]' : 'text-gray-400 bg-transparent'}`}>
                        <div className='w-full flex gap-2 md:pl-15'>
                            <ListTodo className='mx-auto md:mx-0' /> <span className='hidden md:block'> List Bookings </span>
                        </div>
                    </NavLink>
                    <NavLink to='/admin/scan' className={({ isActive }) => `block py-2  transition ${isActive ? 'bg-[var(--primary-color)]/15 text-[var(--primary-color)]' : 'text-gray-400 bg-transparent'}`}>
                        <div className='w-full flex gap-2 md:pl-15'>
                            <Camera className='mx-auto md:mx-0' /> <span className='hidden md:block'> Scan Ticket </span>
                        </div>
                    </NavLink>
                </div>

            </div>
        </>
    )
}



// /assets/profile-CXhnMaZT.png
