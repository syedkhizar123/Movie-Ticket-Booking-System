const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/DB')
dotenv.config({quiet: true})
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())
const userRoutes = require('./Routes/UserRoutes')
const bookingRoutes = require('./Routes/BookingRoutes')
const moviesRoutes = require('./Routes/MoviesRoutes')

app.get('/image-proxy', async (req, res) => {
  try {
    const imageUrl = req.query.url; 
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'image/jpeg');
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send('Failed to fetch image');
  }
});

app.use('/user' , userRoutes)
app.use('/bookings' , bookingRoutes)
app.use('/movies' , moviesRoutes)

connectDB() 

app.listen(PORT , () => {
    console.log(`The server is running on PORT ${PORT}`)
})