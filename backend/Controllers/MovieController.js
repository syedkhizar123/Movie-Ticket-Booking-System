const movies = require('../Models/MoviesModel')

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await movies.find()
        return res.status(200).json({ message: "Movies fetched Successfully", allMovies })
    } catch (error) {
        return res.status(400).json({ status: "Catch Block", message: error.message })
    }
}

const addMovie = async (req, res) => {
    try {
        const { id, title, overview, poster_path, backdrop_path, genres, casts, release_date, original_language, vote_average, runtime, price, date } = req.body
        if (!id || !title || !overview || !poster_path || !backdrop_path || !genres || !casts || !release_date || !original_language || !vote_average || !runtime || !price) {
            return res.status(400).json({ message: "All fields are necessary" })
        }

        const existingMovie = await movies.findOne({ id: id })
        if (existingMovie) {
            return res.status(400).json({message: "Movie already exists"})
        }
        const newMovie = new movies({
            id,
            title,
            overview,
            poster_path,
            backdrop_path,
            genres,
            casts,
            date,
            release_date,
            original_language,
            vote_average,
            runtime,
            price
        })

        await newMovie.save()

        return res.status(200).json({ message: "Show added successfully" })
    } catch (error) {
        return res.status(400).json({ status: "Catch Block", message: error.message })
    }
}

module.exports = { getAllMovies, addMovie }