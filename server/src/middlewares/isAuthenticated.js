import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const protect = async (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        return res.status(401).json(
            {
                error: "unauthorized!!!"
            }
        )
    }
    const token = bearer.split(" ")[1]
    if (!token) {
        return res.status(403).json({
            error: "forbidden!!!"
        })
    }
    try {
        const verified = promisify(jwt.verify)(token, process.env.jwtsecret)
        const exists = await user.findOne({ _id: verified.id })

        if (!exists) {
            return res.status(404).json({
                error: "user doesnot exist"
            })
        }
        req.user = exists
        req.userId = exists.id
        next()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}