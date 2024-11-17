import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const FriendRequests = mongoose.model('FriendRequests', friendRequestSchema);

export default FriendRequests;