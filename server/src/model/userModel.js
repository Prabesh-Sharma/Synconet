import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    Interests: {
      type: [String],
      default: [],
    },
    profilePicture: {
      type: String,
      default: 'https://as2.ftcdn.net/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
    },
    friends: {
      type: [String],
      default: [],
    },
    incFriendRequests: {
      type: [String],
      default: [],
    },
    outFriendRequests: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
