import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class UserController {
    async register(req, res) {
        let { email, password, username } = req.body
        email = email.trim()
        password = password.trim()
        username = username.trim()

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
        const hashedPassword = await bcrypt.hash(password, 10) //hashes the password 10 times adds salt each time
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
        let { email, password } = req.body
        email = email.trim()
        password = password.trim()

        if (!email || !password) {
            return res.status(400).json({
                error: "bad request"
            })
        }
        const userData = await User.find({ email: email })
        if (userData.length === 0) {
            return res.status(404).json({
                error: "email not found"
            })
        }
        const Matched = await bcrypt.compare(password, userData[0].password)
        if (Matched) {
            const token = jwt.sign({ id: userData[0]._id }, process.env.jwtsecret, { expiresIn: "1d" })
            res.status(200).json({
                message: "login sucessful",
                token,
            })
        }
        else {
            res.status(400).json({
                message: "invalid password"
            })
        }
    }

    async getUserInfo(req, res) {
        const user = await User.findById(req.user)

        if (!user) {
            return res.status(404).json({
                error: "user not found"
            })
        }

        res.status(200).json({
            message: "user data fetched",
            user: {
                username: user.username,
                email: user.email
            }
        })
    }
}

const userController = new UserController()
export default userController