import User from "../model/userModel.js"

class InterestController {

    async getInterest(req, res) {
        const userId = await req.user
        const user = await User.findById(userId, 'Interests')

        if (!user) {
            return res.status(404).json({
                error: "user not found"
            })
        }

        res.status(200).json({
            interests: user.Interests
        })
    }

    async setInterest(req, res) {
        const userId = await req.user
        const { interests } = req.body

        if (interests.length === 0) {
            return res.status(400).json({
                error: "interests cannot be empty"
            })
        }

        await User.findByIdAndUpdate(
            userId,
            { $push: { Interests: { $each: interests } } }
        )

        res.status(201).json({
            message: "interests added sucessfully"
        })
    }

    async recommendations(req, res) {
        const userId = await req.user

        const currentUser = await User.findById(userId, 'Interests')
        const interests = currentUser.Interests

        const matchingUsers = await User.find(
            {
                _id: { $ne: userId },
                Interests: { $in: interests },
            }, '-password')

        return res.status(200).json({
            message: "recommendations fetched",
            matchingUsers,
        })
    }
}

const interestController = new InterestController()
export default interestController 