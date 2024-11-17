import express from "express";
import { joinUser, loginWithToken, sendVerficationEmail, verifyUser  } from "../controller/userController.js";
import isAuthenticated from "../utils/isAuthenticated.js";

const userRouter = express.Router();

userRouter.post("/auth", joinUser);
userRouter.get("/token", isAuthenticated, loginWithToken)
userRouter.post("/sendEmail", sendVerficationEmail);
userRouter.post("/verify", verifyUser);

export default userRouter;
