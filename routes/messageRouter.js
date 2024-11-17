import express from "express";
import isAuthenticated from "../utils/isAuthenticated.js";
import { getUserMessages } from '../controller/messageController.js'
const messageRouter = express.Router();

messageRouter.post("/", isAuthenticated, getUserMessages);
// userRouter.get("/token", isAuthenticated, loginWithToken)
// userRouter.post("/sendEmail", sendVerficationEmail);
// userRouter.post("/verify", verifyUser);

export default messageRouter;
