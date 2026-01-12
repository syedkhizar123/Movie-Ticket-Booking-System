const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({quiet : true})
const MONGODB_URL = process.env.MONGODB_URL

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(MONGODB_URL)
        console.log("MongoDB connected:");
    } catch (error) {
        console.log(error)   
    } 
}

module.exports = connectDB;

