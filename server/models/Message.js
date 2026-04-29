import mongoose from 'mongoose'

// model for user
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // it will reference the User model so we would be able to fetch entire user document from db not just objectId
      required: true,
    },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    image: { type: String },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Message = mongoose.model('Message', messageSchema)

export default Message
