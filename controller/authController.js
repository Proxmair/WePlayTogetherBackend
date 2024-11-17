import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const loginUser = asyncErrorHandler(async (req, res) => {
    sendResponse(res, 200, "loginUser");
});
