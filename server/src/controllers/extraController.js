import User from '../model/userModel.js'

export const interestcnt = async (req, res) => {
  try {
    const users = await User.find({}, 'Interests')

    const interestStats = {}

    users.forEach((user) => {
      if (Array.isArray(user.Interests)) {
        user.Interests.forEach((interest) => {
          if (interest) {
            interestStats[interest] = (interestStats[interest] || 0) + 1
          }
        })
      }
    })

    res.json({
      success: true,
      data: interestStats,
      totalUsers: users.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving interest statistics',
      error: error.message,
    })
  }
}
