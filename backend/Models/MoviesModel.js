const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    backdrop_path: {
        type: String,
        required: true
    },
    genres: {
        type: [
            {
                _id: false,
                name: String
            }
        ],
        required: true
    },
    casts: {
        type: [
            {
                _id: false,
                name: String,
                profile_path: String
            }
        ],
        required: true
    },
    date: {
        type: [
            {
                date: String,
                time: String
            }
        ],
        required: false
    },
    release_date: {
        type: String,
        required: true
    },
    original_language: {
        type: String,
        required: true
    },
    vote_average: {
        type: Number,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("Movies", movieSchema)

