import Messages from "../models/messageSchema.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const getUserMessages = asyncErrorHandler(async (req, res) => {
    const { recipientId } = req.body;
    const senderId = req.userId;
    
    if(!(senderId && recipientId)){
        return sendResponse(res, 400, "Missing sender or recipient")
    }
    const userMessages = await Messages.find({
        $or: [
            { senderId, recipientId }, // Messages where current user is the sender
            { senderId: recipientId, recipientId: senderId }, // Messages where current user is the recipient
        ]
    }).sort({ createdAt: 1 });
   
    sendResponse(res, 200, "User Messages send successfully", userMessages)
});