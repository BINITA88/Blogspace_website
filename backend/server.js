import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import chatRoutes from "./routes/chatRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS Setup
if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.use("/api/v1/chat", chatRoutes);
// app.use("/api/v1/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// HTTP server and Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// Socket.IO logic
let users = {}; // socketId -> username
let userSockets = {}; // username -> socketId
let privateMessages = {}; // "user1-user2" -> [messages]

function createChatKey(user1, user2) {
	return [user1, user2].sort().join("-");
}

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("join", (username) => {
		users[socket.id] = username;
		userSockets[username] = socket.id;
		socket.broadcast.emit("userConnected", username);
		io.emit("userList", Object.values(users));
		console.log(`${username} joined the chat`);
	});

	socket.on("privateMessage", ({ recipient, text, timestamp }) => {
		const sender = users[socket.id];
		if (!sender) return;

		const message = {
			id: Date.now() + Math.random(),
			sender,
			recipient,
			text,
			timestamp: timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		const chatKey = createChatKey(sender, recipient);
		if (!privateMessages[chatKey]) privateMessages[chatKey] = [];
		privateMessages[chatKey].push(message);

		const recipientSocketId = userSockets[recipient];
		if (recipientSocketId) io.to(recipientSocketId).emit("privateMessage", message);
		socket.emit("privateMessage", message);

		console.log(`Private message from ${sender} to ${recipient}: ${text}`);
	});

	socket.on("getMessages", ({ user1, user2 }) => {
		const chatKey = createChatKey(user1, user2);
		const messages = privateMessages[chatKey] || [];
		socket.emit("loadMessages", messages);
		console.log(`Loaded ${messages.length} messages for ${user1} and ${user2}`);
	});

	socket.on("initiateVideoCall", ({ recipient }) => {
		const caller = users[socket.id];
		const recipientSocketId = userSockets[recipient];
		if (recipientSocketId) {
			io.to(recipientSocketId).emit("incomingVideoCall", { caller, callType: "video" });
			console.log(`Video call from ${caller} to ${recipient}`);
		}
	});

	socket.on("initiateVoiceCall", ({ recipient }) => {
		const caller = users[socket.id];
		const recipientSocketId = userSockets[recipient];
		if (recipientSocketId) {
			io.to(recipientSocketId).emit("incomingVoiceCall", { caller, callType: "voice" });
			console.log(`Voice call from ${caller} to ${recipient}`);
		}
	});

	socket.on("callResponse", ({ caller, accepted, callType }) => {
		const responder = users[socket.id];
		const callerSocketId = userSockets[caller];
		if (callerSocketId) {
			io.to(callerSocketId).emit("callResponse", { responder, accepted, callType });
			console.log(`Call ${accepted ? "accepted" : "rejected"} by ${responder}`);
		}
	});

	socket.on("endCall", ({ otherUser }) => {
		const user = users[socket.id];
		const otherUserSocketId = userSockets[otherUser];
		if (otherUserSocketId) {
			io.to(otherUserSocketId).emit("callEnded", { user });
			console.log(`Call ended between ${user} and ${otherUser}`);
		}
	});

	socket.on("typing", ({ recipient, isTyping }) => {
		const sender = users[socket.id];
		const recipientSocketId = userSockets[recipient];
		if (recipientSocketId) {
			io.to(recipientSocketId).emit("userTyping", { user: sender, isTyping });
		}
	});

	socket.on("disconnect", () => {
		const username = users[socket.id];
		if (username) {
			console.log("User disconnected:", username);
			delete users[socket.id];
			delete userSockets[username];
			socket.broadcast.emit("userDisconnected", username);
			io.emit("userList", Object.values(users));
		}
	});

	socket.on("getUserList", () => {
		socket.emit("userList", Object.values(users));
	});
});

// Health check route
app.get("/", (req, res) => {
	res.json({
		message: "Chat server is running!",
		connectedUsers: Object.keys(users).length,
		totalChats: Object.keys(privateMessages).length,
	});
});

// API for chat stats
app.get("/api/stats", (req, res) => {
	res.json({
		connectedUsers: Object.values(users),
		totalChats: Object.keys(privateMessages).length,
		totalMessages: Object.values(privateMessages).reduce((sum, arr) => sum + arr.length, 0),
	});
});

// Final: start server
connectDB();
server.listen(PORT, () => {
	console.log(`🚀 Chat server is running on port ${PORT}`);
	console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
	console.log(`📊 Stats available at: http://localhost:${PORT}/api/stats`);
});


// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);

// // CORS configuration
// const io = socketIO(server, {
//     cors: {
//         origin: 'http://localhost:5173', // Vite dev server
//         methods: ['GET', 'POST'],
//         credentials: true
//     }
// });

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

// // Store connected users and their socket IDs
// let users = {}; // { socketId: username }
// let userSockets = {}; // { username: socketId }

// // Store private messages between users
// let privateMessages = {}; // { "user1-user2": [messages] }

// // Helper function to create chat key for two users
// function createChatKey(user1, user2) {
//     return [user1, user2].sort().join('-');
// }

// // Socket.io connection handling
// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     // Handle user joining
//     socket.on('join', (username) => {
//         // Store user mapping
//         users[socket.id] = username;
//         userSockets[username] = socket.id;
        
//         // Notify all users about new user
//         socket.broadcast.emit('userConnected', username);
        
//         // Send updated user list to all clients
//         const userList = Object.values(users);
//         io.emit('userList', userList);
        
//         console.log(`${username} joined the chat`);
//     });

//     // Handle private messages between users
//     socket.on('privateMessage', (messageData) => {
//         const sender = users[socket.id];
//         if (!sender) return;

//         const { recipient, text, timestamp } = messageData;
        
//         // Create message object
//         const message = {
//             id: Date.now() + Math.random(),
//             sender: sender,
//             recipient: recipient,
//             text: text,
//             timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         };

//         // Store message in chat history
//         const chatKey = createChatKey(sender, recipient);
//         if (!privateMessages[chatKey]) {
//             privateMessages[chatKey] = [];
//         }
//         privateMessages[chatKey].push(message);

//         // Send message to both sender and recipient
//         const recipientSocketId = userSockets[recipient];
        
//         // Send to recipient if online
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('privateMessage', message);
//         }
        
//         // Send back to sender for confirmation
//         socket.emit('privateMessage', message);

//         console.log(`Private message from ${sender} to ${recipient}: ${text}`);
//     });

//     // Handle request to get messages for a conversation
//     socket.on('getMessages', (data) => {
//         const { user1, user2 } = data;
//         const chatKey = createChatKey(user1, user2);
//         const messages = privateMessages[chatKey] || [];
        
//         // Send messages to the requesting user
//         socket.emit('loadMessages', messages);
//         console.log(`Loaded ${messages.length} messages for ${user1} and ${user2}`);
//     });

//     // Handle video call initiation
//     socket.on('initiateVideoCall', (data) => {
//         const caller = users[socket.id];
//         const { recipient } = data;
//         const recipientSocketId = userSockets[recipient];
        
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('incomingVideoCall', {
//                 caller: caller,
//                 callType: 'video'
//             });
//             console.log(`Video call initiated from ${caller} to ${recipient}`);
//         }
//     });

//     // Handle voice call initiation
//     socket.on('initiateVoiceCall', (data) => {
//         const caller = users[socket.id];
//         const { recipient } = data;
//         const recipientSocketId = userSockets[recipient];
        
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('incomingVoiceCall', {
//                 caller: caller,
//                 callType: 'voice'
//             });
//             console.log(`Voice call initiated from ${caller} to ${recipient}`);
//         }
//     });

//     // Handle call response (accept/reject)
//     socket.on('callResponse', (data) => {
//         const responder = users[socket.id];
//         const { caller, accepted, callType } = data;
//         const callerSocketId = userSockets[caller];
        
//         if (callerSocketId) {
//             io.to(callerSocketId).emit('callResponse', {
//                 responder: responder,
//                 accepted: accepted,
//                 callType: callType
//             });
//             console.log(`Call ${accepted ? 'accepted' : 'rejected'} by ${responder}`);
//         }
//     });

//     // Handle call end
//     socket.on('endCall', (data) => {
//         const user = users[socket.id];
//         const { otherUser } = data;
//         const otherUserSocketId = userSockets[otherUser];
        
//         if (otherUserSocketId) {
//             io.to(otherUserSocketId).emit('callEnded', { user: user });
//             console.log(`Call ended between ${user} and ${otherUser}`);
//         }
//     });

//     // Handle user typing indicator
//     socket.on('typing', (data) => {
//         const sender = users[socket.id];
//         const { recipient, isTyping } = data;
//         const recipientSocketId = userSockets[recipient];
        
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('userTyping', {
//                 user: sender,
//                 isTyping: isTyping
//             });
//         }
//     });

//     // Handle user disconnecting
//     socket.on('disconnect', () => {
//         const username = users[socket.id];
//         if (username) {
//             console.log('User disconnected:', username);
            
//             // Remove user from mappings
//             delete users[socket.id];
//             delete userSockets[username];
            
//             // Notify other users
//             socket.broadcast.emit('userDisconnected', username);
            
//             // Send updated user list
//             const userList = Object.values(users);
//             io.emit('userList', userList);
//         }
//     });

//     // Handle getting user list
//     socket.on('getUserList', () => {
//         const userList = Object.values(users);
//         socket.emit('userList', userList);
//     });
// });

// // Basic route for health check
// app.get('/', (req, res) => {
//     res.json({ 
//         message: 'Chat server is running!', 
//         connectedUsers: Object.keys(users).length,
//         totalChats: Object.keys(privateMessages).length
//     });
// });

// // API endpoint to get chat statistics
// app.get('/api/stats', (req, res) => {
//     res.json({
//         connectedUsers: Object.values(users),
//         totalChats: Object.keys(privateMessages).length,
//         totalMessages: Object.values(privateMessages).reduce((total, chat) => total + chat.length, 0)
//     });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`🚀 Chat server is running on port ${PORT}`);
//     console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
//     console.log(`📊 Stats available at: http://localhost:${PORT}/api/stats`);
// });