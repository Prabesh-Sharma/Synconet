import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail } from '../services/transporter.js'

class UserController {
  async register(req, res) {
    const { email, password, username } = req.body

    const test = req.body
    console.log(test)

    if (!email || !username || !password) {
      return res.status(400).json({
        error: 'bad request',
      })
    }

    const userExists = await User.findOne({ email: email })
    const userNameTaken = await User.findOne({ username: username })

    if (userNameTaken) {
      return res.status(409).json({
        error: 'username already taken',
      })
    }

    if (userExists) {
      return res.status(400).json({
        error: 'user already exists',
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10) //hashes the password 2^10 times adds salt each time
    const data = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    })

    const verificationToken = jwt.sign({ id: data._id }, process.env.jwtsecret, { expiresIn: '1d' })

    const verificationLink = `${process.env.API_URL}api/user/verify-email?token=${verificationToken}`

    await sendVerificationEmail(email, username, verificationLink)
    res.status(201).json({
      message: 'user registered sucessfully',
      data,
    })
  }

  async login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: 'bad request',
      })
    }

    const userData = await User.find({ email: email })
    if (userData.length === 0) {
      return res.status(404).json({
        error: 'email not found',
      })
    }

    if (!userData[0].isVerified) {
      return res.status(400).json({
        error: 'email not verified',
      })
    }

    const Matched = await bcrypt.compare(password, userData[0].password)
    if (Matched) {
      const token = jwt.sign({ id: userData[0]._id }, process.env.jwtsecret, { expiresIn: '1d' })
      console.log('token:' + token)
      res.status(200).json({
        message: 'login sucessful',
        token,
      })
    } else {
      res.status(401).json({
        message: 'invalid email or password',
      })
    }
  }

  async getUserInfo(req, res) {
    const user = await User.findById(req.user)

    if (!user) {
      return res.status(404).json({
        error: 'user not found',
      })
    }

    res.status(200).json({
      message: 'user data fetched',
      user: {
        username: user.username,
        email: user.email,
        profilePic: user.profilePicture,
      },
    })
  }

  async verifyEmail(req, res) {
    const { token } = req.query
    if (!token) {
      return res.status(400).json({
        error: 'Verification token is missing',
      })
    }

    try {
      const decoded = jwt.verify(token, process.env.jwtsecret)
      const user = await User.findById(decoded.id)

      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        })
      }

      if (user.isVerified) {
        return res.status(400).json({
          message: 'Email is already verified',
        })
      }

      user.isVerified = true
      await user.save()

      res.status(200).send(
        `
        <h1>email verification sucessful</h1>
        `
      )
    } catch (err) {
      console.error('Error verifying email:', err)
      res.status(400).json({
        error: 'Invalid or expired token',
      })
    }
  }

  async sendFriendReq(req, res) {
    const user = await user.findById(req.user)
  }

  async getFriendReq(req, res) {
    const user = await user.findById(req.user)
  }

  async changePassword(req, res) {
    const user = await User.findById(req.user)
    console.log(req.body)
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'bad request' })
    }
    const isMatching = await bcrypt.compare(oldPassword, user.password)
    console.log(isMatching)
    if (isMatching) {
      user.password = await bcrypt.hash(newPassword, 10)
      user.save()
      return res.status(200).json({
        passwordMatches: isMatching,
      })
    }
    return res.status(404).json({
      error: 'old password doesnot match',
    })
  }
}

const userController = new UserController()
export default userController
