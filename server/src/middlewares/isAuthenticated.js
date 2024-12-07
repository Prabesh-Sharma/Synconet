import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'
import { promisify } from 'util'

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    return res.status(401).json({
      error: 'Unauthorized!!!',
    })
  }

  const token = bearer.split(' ')[1]

  try {
    const verified = await promisify(jwt.verify)(token, process.env.jwtsecret)

    const exists = await User.findOne({ _id: verified.id })

    if (!exists) {
      return res.status(404).json({
        error: 'User does not exist',
      })
    }

    req.user = verified.id
    req.userId = exists._id

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' })
    }
    console.error('Error during token verification:', error)
    res.status(500).json({ message: 'Internal server error' })
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export default protect
