const booking = require('../Models/BookingModel')

const bookMovie = async (req, res) => {
    try {
        const userId = req.user.id
        const { movie, date, time, seats, total } = req.body
        if (!movie || !date || !time || !seats || !total) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingBooking = await booking.findOne({
            movie,
            date,
            time,
            seats: { $in: seats }
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Cannot select booked seats." });
        }
        const bookingId = Date.now()
        const newBooking = new booking({
            userId,
            bookingId,
            movie,
            date,
            time,
            seats,
            total
        })

        await newBooking.save()

        return res.status(200).json({ message: "Booking Successful" })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


const getAllbookings = async ( req , res ) => {
    try {
        const AllBookings = await booking.find()
        return res.status(200).json({message: "Bookings fetched successfully" , AllBookings})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const getMyBookings = async (req , res) => {
    try {
        const myBookings = (await booking.find({userId: req.user._id}))
        return res.status(200).json({message: "Fetched Succesfully" , myBookings})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
module.exports = { bookMovie , getAllbookings , getMyBookings}