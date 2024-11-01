import User from "../model/userModel.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

class UserController {
    async register(req, res) {
        const { email, password, username } = req.body
        if (!email || !username || !password) {
            return res.status(400).json({
                error: "bad request"
            })
        }

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(400).json({
                error: "user already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        res.status(201).json({
            message: "user registered sucessfully",
            data
        })
    }

    async login(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                error: "bad request"
            })
        }
        const userData = await User.findOne({ email: email })
        if (!userData) {
            return res.status(404).json({
                error: "email not found"
            })
        }
        const Matched = await bcrypt.compare(password, userData.password)
        if (Matched) {
            const token = jwt.sign({ id: "userData._id" }, process.env.jwtsecret, { expiresIn: "1d" })
            res.status(200).json({
                message: "login sucessful",
                token,
                data: userData
            })
        }
        else {
            res.status(400).json({
                message: "invalid password"
            })
        }
    }
}

const userController = new UserController()
export default userController