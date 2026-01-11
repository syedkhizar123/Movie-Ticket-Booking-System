const express = require('express')
const router = express.Router()
const { bookMovie , getAllbookings , getMyBookings} = require('../Controllers/BookingController')
const { AuthMiddlware } = require('../Middlewares/AuthMiddleware')

router.post('/bookMovie', AuthMiddlware , bookMovie)
router.get('/getbookings' , getAllbookings)
router.get('/getMyBookings', AuthMiddlware , getMyBookings)

module.exports = router