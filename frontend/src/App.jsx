import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Movies } from './Pages/Movies'
import './App.css'
import { Navbar } from './Components/Navbar'
import { Footer } from './Components/Footer'
import { DynamicMovie } from './Pages/DynamicMovie'
import { Seats } from './Pages/Seats'
import { ScrollToTop } from './Components/ScrollToTop'
import { Toaster } from 'react-hot-toast'
import { Bookings } from './Pages/Bookings'
import { Tickets } from './Pages/Tickets'
import { Checkout } from './Pages/Checkout'
import { ScanTicket } from './Pages/ScanTicket'
import { Login } from './Pages/Login'
import { Signup } from './Pages/Signup'
import { AdminLayout } from './Components/AdminLayout'
import { AdminDashboard } from './Pages/AdminDashboard'
import { AddShow } from './Pages/AddShow'
import { ListShows } from './Pages/ListShows'
import { ListBookings } from './Pages/ListBookings'
import { AdminLogin } from './Pages/AdminLogin'
import { Upcoming } from './Pages/Upcoming'

function AppWrapper() {

  const location = useLocation();

  const hide = ["/admin", "/login", "/signup", "/scan"].some(path =>
    location.pathname.startsWith(path)
  );



  return (
    <>
      {!hide && <Navbar />}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/upcoming' element={<Upcoming />}/>
        <Route path='/movie/:id' element={<DynamicMovie />} />
        <Route path='/movie/:id/:date' element={<Seats />} />
        <Route path='/my-bookings' element={<Bookings />} />
        <Route path='/my-bookings/:bookingId' element={<Tickets />} />
        <Route path='/checkout/:id/:date/:time/:seats' element={<Checkout />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add" element={<AddShow />} />
          <Route path="showsList" element={<ListShows />} />
          <Route path="bookingsList" element={<ListBookings />} />
          <Route path='scan' element={<ScanTicket />} />
        </Route>
      </Routes>
      <ScrollToTop />
      {!hide && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}

export default App
