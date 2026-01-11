const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ quiet: true })
const User = require('../Models/UserModel')
const JWT_SECRET = process.env.JWT_SECRET

const AuthMiddlware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, JWT_SECRET)
            const user = await User.findOne({ email: decoded.email }).select('-password')

            if (!user) {
                return res.status(400).json({ message: "Invalid token" })
            }
            req.user = user
            return next()

        } catch (error) {
            return res.status(401).json({ message: "Invalid token" })
        }
    }

    if(!token){
            return res.status(401).json({ message: "Not logged in" })
    }
}

module.exports = { AuthMiddlware }