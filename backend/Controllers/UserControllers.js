const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config({ quiet: true })
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req, res) => {

    const {email , password} = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '10d' });
        const newUser = new User({
            email,
            password: hashedPassword
        })

        await newUser.save()
        return res.status(200).json({ message: "User registered successfully", token })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


const loginUser = async (req, res) => {
    const {email , password} = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' })
        }

        const findUser = await User.findOne({ email })
        if (!findUser) {
            return res.status(400).json({ message: "Invalid email" })
        }

        const checkPassword = await bcrypt.compare(password, findUser.password)
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign({email} , JWT_SECRET , {expiresIn : '10d'})

        await findUser.save()
        return res.status(200).json({message: 'Login Successful' , token})
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { registerUser , loginUser}