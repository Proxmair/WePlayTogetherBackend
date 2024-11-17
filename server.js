import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import { connectDatabase } from "./config/database.js";
import mainRouter from './routes/index.js';
import passport from 'passport'
import cors from 'cors'
import session from 'express-session'
import { createServer } from 'http';
import { Server } from 'socket.io';
import FriendRequests from "./models/friendRequestSchema.js";
import Messages from "./models/messageSchema.js";

// Load environment variables first
dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*", // Replace with your frontend URL
  credentials: true, // Allow credentials
}));

// Passport
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/api/v1', mainRouter);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Replace with your frontend URL in production
    methods: ["GET", "POST"]
  }
});

const userSocketMap = new Map()
const onlineUsers = [];

const findSocketIdByUserId = (userId) => {
  for (let [socketId, user] of userSocketMap.entries()) {
    if (user._id === userId) {
      return socketId;
    }
  }
  return null;
};


io.on('connection', (socket) => {

  const user = socket.handshake.auth.user;
  if (user?._id) {
    userSocketMap.set(socket.id, user);
    socket.emit('online-users', onlineUsers);
    const isUserAlreadyOnline = onlineUsers.find(onlineUser => onlineUser._id === user._id);
    if (!isUserAlreadyOnline) {
      onlineUsers.push(user);
    }
    socket.broadcast.emit('user-connected', { user });
  }

  socket.on('disconnect', () => {
    const disconnectedUser = userSocketMap.get(socket.id);
    userSocketMap.delete(socket.id);

    if (disconnectedUser?._id) {
      const index = onlineUsers.findIndex(u => u._id === disconnectedUser._id);
      if (index !== -1) {
        onlineUsers.splice(index, 1);
      }
      io.emit('user-disconnected', { user: disconnectedUser });
    }

  });

  socket.on('send-friend-request', async ({ recipientId }) => {
    const recipientSocketId = findSocketIdByUserId(recipientId);
    const friendRequest = await FriendRequests.create({
      senderId: user._id,
      recipientId,
      status: 'pending',
    });

    const requestData = {
      _id: friendRequest._id,
      senderId: friendRequest.senderId,
      recipientId: friendRequest.recipientId,
      status: friendRequest.status
    };

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('friend-request-received', { friendRequest: requestData });
      io.to(socket.id).emit('friend-request-received', { friendRequest: requestData });
    }

  });

  socket.on('accept-friend-request', async ({ recipientId }) => {

    const recipientSocketId = findSocketIdByUserId(recipientId);
    const acceptedFriendRequest = await FriendRequests.findOneAndUpdate(
      { recipientId: user._id, senderId: recipientId },
      { $set: { status: 'accepted' } },
      { new: true }
    );

    if (acceptedFriendRequest) {
      const requestData = {
        _id: acceptedFriendRequest._id,
        senderId: acceptedFriendRequest.senderId,
        recipientId: acceptedFriendRequest.recipientId,
        status: acceptedFriendRequest.status
      };
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('accept-friend-request-notify', { friendRequest: requestData });
        io.to(socket.id).emit('accept-friend-request-notify', { friendRequest: requestData });
      }
    }

  });

  socket.on('cancel-friend-request', async ({ recipientId }) => {

    const recipientSocketId = findSocketIdByUserId(recipientId);
    const cancelFriendRequest = await FriendRequests.findOneAndUpdate(
      { recipientId: user._id, senderId: recipientId },
      { $set: { status: 'declined' } },
      { new: true }
    );

    if (cancelFriendRequest) {
      const requestData = {
        _id: cancelFriendRequest._id,
        senderId: cancelFriendRequest.senderId,
        recipientId: cancelFriendRequest.recipientId,
        status: cancelFriendRequest.status
      };
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('cancel-friend-request-notify', { friendRequest: requestData });
        io.to(socket.id).emit('cancel-friend-request-notify', { friendRequest: requestData });
      }
    }

  });

  socket.on('sent-message', async ({ message, recipientId }) => {
    const recipientSocketId = findSocketIdByUserId(recipientId);
    const senderId = user._id;
    const newMessage = await Messages.create({
      senderId,
      recipientId,
      content: message,
      status: 'sent',
      isGroupMessage: false
    });

    if (newMessage) {
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('sent-message-notify', { message: newMessage });
        io.to(socket.id).emit('sent-message-notify', { message: newMessage });
      }
    }
  });





});

// Connect to the database
connectDatabase();

// Start the server
const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
