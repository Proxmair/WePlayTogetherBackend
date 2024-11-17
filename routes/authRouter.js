import express from "express";
import { loginUser } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.get("/login", loginUser);

export default authRouter;
