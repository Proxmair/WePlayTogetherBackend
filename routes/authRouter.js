import express from "express";
import { loginUser, loadUser } from "../controller/authController.js";
import isAuthenticated from "../utils/isAuthenticated.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.get("/token",isAuthenticated,loadUser);


export default authRouter;
