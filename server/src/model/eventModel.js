import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      default: null,
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'declined'],
          default: 'pending',
        },
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default:
        'https://media.gettyimages.com/id/1094465614/photo/speaker-addressing-group-of-females.jpg?s=1024x1024&w=gi&k=20&c=Ui-OnxwLdSTw5F3VUc6sbVB-CuHVRX2EaVr4p2MnJ8Y=',
    },
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('Event', eventSchema)
export default Event
