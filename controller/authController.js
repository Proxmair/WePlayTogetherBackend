import Users from "../models/userSchema.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import sendResponse from "../utils/sendResponse.js";
import jwt from 'jsonwebtoken'

export const loginUser = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email, password: password });
    if (!user) {
        return sendResponse(res, 401, "Invalid email or password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    // userSocketMap.set(user._id, { socketId: req.socket.id });
    sendResponse(res, 200, "User logged in successfully", user, token);
});

export const loadUser = asyncErrorHandler(async (req, res) => {
    const user = await Users.findById(req.userId);
    if (!user) {
        return sendResponse(res, 404, "User not found");
    }
    sendResponse(res, 200, "User loaded successfully", user);
});