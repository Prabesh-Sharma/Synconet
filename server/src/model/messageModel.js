import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
    },
    receiver: {
      type: String,
      required: [true, 'Receiver name is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
