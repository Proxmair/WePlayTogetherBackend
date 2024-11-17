
import asyncErrorHandler from "./asyncErrorHandler.js";
import sendResponse from './sendResponse.js'
import jwt from 'jsonwebtoken'

const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return sendResponse(res, 205, "Token not found");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
});

export default isAuthenticated