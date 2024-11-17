import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
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
    content: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent',
    },
    isGroupMessage: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

messageSchema.index({ senderId: 1, recipientId: 1, createdAt: -1 });

const Messages = mongoose.model('Messages', messageSchema);

export default Messages;
