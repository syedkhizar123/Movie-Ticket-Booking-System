import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthContext } from '../Contexts/AuthContext'
import { useContext } from 'react'
import { Loader2 } from 'lucide-react'

export const SignupLogin = ({ title, text, link }) => {

  const [loading , setLoading] = useState(false)
  const Backend_URL = import.meta.env.VITE_Backend_URL
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { loginStatus , setLoginStatus } = useContext(AuthContext)

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    setLoading(true)
    const endpoint =
      title === "Login"
        ? `${Backend_URL}/user/login`
        : `${Backend_URL}/user/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        toast.error(data.message || "Request failed");
        setLoading(false)
        return;
      }

      toast.success(`${title} successful`);
      setLoading(false)
      localStorage.setItem('cinema_app_token' , data.token)
      setLoginStatus(true)
      navigate('/')

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
      setLoading(false)
      console.error(error);
    }
  };

  return (
    <>
      <div className='h-105 max-w-[450px] w-[95%] bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-lg flex flex-col gap-5'>
        <p className='capitalize text-center text-3xl text-white mt-10'>{title}</p>
        <div className='flex flex-col gap-2 w-[80%] min-w-[280px] mx-auto'>
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} id='email' name='email' type="email" placeholder='Enter your email' className='pl-2 h-10 border-1 rounded-lg border-[var(--primary-color)]' />
        </div>
        <div className='flex flex-col gap-2 w-[80%] min-w-[280px] mx-auto'>
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e) => { setPassword(e.target.value) }} id='password' name='password' type="password" placeholder='Enter your password' className='pl-2 h-10 border-1 rounded-lg border-[var(--primary-color)]' />
        </div>
        <button onClick={handleSubmit} className='mt-5 bg-[var(--primary-color)] text-white rounded-full px-5 py-2 hover:bg-[var(--secondary-color)] cursor-pointer w-[80%] mx-auto'> { loading ? (<Loader2 className='mx-auto animate-spin' />) : (title)} </button>
        <p className='w-[max-content] mx-auto'>{text} ? <Link className='font-semibold capitalize' to={`/${link}`}>{link}</Link></p>
      </div>
    </>
  )
}

