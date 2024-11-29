import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendVerificationEmail } from "../services/transporter.js"

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
    const hashedPassword = await bcrypt.hash(password, 10) //hashes the password 10 times adds salt each time
    const data = await User.create({
      username: username,
      email: email,
      password: hashedPassword
    })

    const verificationToken = jwt.sign(
      { id: data._id },
      process.env.jwtsecret,
      { expiresIn: "1d" }
    );

    const verificationLink = `http://localhost:6969/api/user/verify-email?token=${verificationToken}`;

    await sendVerificationEmail(email, username, verificationLink)
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
    const userData = await User.find({ email: email })
    if (userData.length === 0) {
      return res.status(404).json({
        error: "email not found"
      })
    }

    if (!userData[0].isVerified) {
      return res.status(400).json({
        error: "email not verified"
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
      res.status(401).json({
        message: "invalid email or password"
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

  async verifyEmail(req, res) {
    const { token } = req.query
    if (!token) {
      return res.status(400).json({
        error: "Verification token is missing"
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.jwtsecret);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({
          error: "User not found"
        });
      }

      if (user.isVerified) {
        return res.status(400).json({
          message: "Email is already verified"
        });
      }

      user.isVerified = true;
      await user.save();

      res.status(200).send(
        `
        <h1>email verification sucessful</h1>
        `
      );
    } catch (err) {
      console.error('Error verifying email:', err);
      res.status(400).json({
        error: "Invalid or expired token"
      });
    }
  }
}

const userController = new UserController()
export default userController