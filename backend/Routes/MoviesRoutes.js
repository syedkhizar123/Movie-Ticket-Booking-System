const express = require('express')
const router = express.Router()
const { getAllMovies , addMovie } = require('../Controllers/MovieController')

router.get("/getAllMovies" , getAllMovies)
router.post("/addMovie" , addMovie)

module.exports = router