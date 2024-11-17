import express from 'express';
import authRouter from './authRouter.js'; 
import messageRouter from './messageRouter.js';

const mainRouter = express.Router();


mainRouter.use('/auth', authRouter);
mainRouter.use('/message', messageRouter)

export default mainRouter;
