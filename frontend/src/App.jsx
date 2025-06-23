import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import Post from "./components/Post";
import Postt from "./pages/Post";
import Home from "./pages/Home";
import SavedPosts from "./pages/SavedPosts";
import Messenger from "./pages/Messenger";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgetPassword from "./pages/auth/ForgetPassword";
// import ChatSidebar from "./components/chat/ChatSidebar";
// import Chat from "./pages/chat/Chat";

function App() {
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await axiosInstance.get("/auth/me");
				return res.data;
			} catch (err) {
				if (err.response && err.response.status === 401) {
					return null;
				}
				toast.error(err.response.data.message || "Something went wrong");
			}
		},
	});

	if (isLoading) return null;

	return (
		<Layout>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
				<Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
				{/* <Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} /> */}
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
				{/* <Route path='/postt' element={authUser ? <Postt /> : <Navigate to={"/login"} />} /> */}
				<Route path="/post/:postId" element={authUser ? <PostPage /> : <Navigate to={"/login"} />} /> {/* Route for post description */}
                <Route path="/postt" element={authUser ? <Postt /> : <Navigate to={"/login"} />} />  {/* Route for post listing */}
				{/* <Route path="/messages" element={authUser ? <ChatSidebar /> : <Navigate to={"/login"} />}/> */}
				<Route path='/messenger' element={<Home/>} />  
				<Route path="/saved-posts" element={<SavedPosts />} />
                <Route path="/messenger" element={<Messenger />} />
			   <Route path="/resetpassword/:token" element={<ResetPassword />} />
               <Route path='/forgot' element={<ForgetPassword/>}/>


			</Routes>
			<Toaster />
		</Layout>
	);
}


// import React, { useState, useEffect, useRef } from 'react';
// import { MessageCircle, Send, Users, LogOut, Search, Phone, Video, MoreVertical } from 'lucide-react';
// import io from 'socket.io-client';

// // Socket connection
// let socket = null;

// function App() {
//   const [username, setUsername] = useState('');
//   const [joined, setJoined] = useState(false);
//   const [message, setMessage] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingUsers, setTypingUsers] = useState(new Set());
//   const messagesEndRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (joined && username) {
//       // Connect to Socket.IO server
//       socket = io('http://localhost:5000', {
//         transports: ['websocket', 'polling']
//       });

//       // Join the chat
//       socket.emit('join', username);

//       // Handle incoming private messages
//       socket.on('privateMessage', (messageData) => {
//         // Only add message if it's for the current conversation
//         if (selectedUser && 
//             ((messageData.sender === username && messageData.recipient === selectedUser.name) ||
//              (messageData.sender === selectedUser.name && messageData.recipient === username))) {
//           setMessages(prev => [...prev, messageData]);
//         }
//       });

//       // Handle user list updates
//       socket.on('userList', (userList) => {
//         const filteredUsers = userList
//           .filter(user => user !== username)
//           .map(user => ({ name: user, id: user, status: 'online' }));
//         setUsers(filteredUsers);
//       });

//       // Handle user connection
//       socket.on('userConnected', (user) => {
//         console.log(`${user} joined the chat`);
//       });

//       // Handle user disconnection
//       socket.on('userDisconnected', (user) => {
//         console.log(`${user} left the chat`);
//         setUsers(prev => prev.filter(u => u.name !== user));
        
//         // If the disconnected user was selected, clear selection
//         if (selectedUser && selectedUser.name === user) {
//           setSelectedUser(null);
//           setMessages([]);
//         }
//       });

//       // Handle typing indicators
//       socket.on('userTyping', (data) => {
//         if (selectedUser && data.user === selectedUser.name) {
//           if (data.isTyping) {
//             setTypingUsers(prev => new Set([...prev, data.user]));
//           } else {
//             setTypingUsers(prev => {
//               const newSet = new Set(prev);
//               newSet.delete(data.user);
//               return newSet;
//             });
//           }
//         }
//       });

//       // Handle video call invitations
//       socket.on('incomingVideoCall', (data) => {
//         const accept = window.confirm(`${data.caller} wants to start a video call. Accept?`);
//         socket.emit('callResponse', {
//           caller: data.caller,
//           accepted: accept,
//           callType: 'video'
//         });
//       });

//       // Handle voice call invitations
//       socket.on('incomingVoiceCall', (data) => {
//         const accept = window.confirm(`${data.caller} wants to start a voice call. Accept?`);
//         socket.emit('callResponse', {
//           caller: data.caller,
//           accepted: accept,
//           callType: 'voice'
//         });
//       });

//       // Handle call responses
//       socket.on('callResponse', (data) => {
//         if (data.accepted) {
//           alert(`${data.responder} accepted your ${data.callType} call!`);
//           // Here you would integrate with WebRTC for actual calling
//         } else {
//           alert(`${data.responder} declined your ${data.callType} call.`);
//         }
//       });

//       // Handle call ended
//       socket.on('callEnded', (data) => {
//         alert(`Call with ${data.user} has ended.`);
//       });

//       // Connection error handling
//       socket.on('connect_error', (error) => {
//         console.error('Connection error:', error);
//         alert('Failed to connect to chat server. Please make sure the server is running.');
//       });

//       return () => {
//         if (socket) {
//           socket.disconnect();
//           socket = null;
//         }
//       };
//     }
//   }, [joined, username, selectedUser]);

//   // Load messages when selecting a user
//   useEffect(() => {
//     if (selectedUser && socket && username) {
//       // Request message history for this conversation
//       socket.emit('getMessages', {
//         user1: username,
//         user2: selectedUser.name
//       });

//       // Handle loaded messages
//       socket.on('loadMessages', (loadedMessages) => {
//         setMessages(loadedMessages);
//       });

//       // Clear messages when switching users
//       setMessages([]);
//     }
//   }, [selectedUser, username]);

//   const handleJoin = () => {
//     if (username.trim()) {
//       setJoined(true);
//     }
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() && socket && selectedUser) {
//       const messageData = {
//         recipient: selectedUser.name,
//         text: message.trim(),
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };

//       socket.emit('privateMessage', messageData);
//       setMessage('');
      
//       // Stop typing indicator
//       handleTypingStop();
//     }
//   };

//   const handleLogout = () => {
//     if (socket) {
//       socket.disconnect();
//       socket = null;
//     }
//     setJoined(false);
//     setUsername('');
//     setUsers([]);
//     setSelectedUser(null);
//     setMessages([]);
//     setSearchTerm('');
//     setTypingUsers(new Set());
//   };

//   const selectUser = (user) => {
//     setSelectedUser(user);
//     setTypingUsers(new Set()); // Clear typing indicators when switching users
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
    
//     // Handle typing indicators
//     if (selectedUser && socket) {
//       if (!isTyping) {
//         setIsTyping(true);
//         socket.emit('typing', {
//           recipient: selectedUser.name,
//           isTyping: true
//         });
//       }

//       // Clear existing timeout
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }

//       // Set new timeout to stop typing indicator
//       typingTimeoutRef.current = setTimeout(() => {
//         handleTypingStop();
//       }, 1000);
//     }
//   };

//   const handleTypingStop = () => {
//     if (isTyping && selectedUser && socket) {
//       setIsTyping(false);
//       socket.emit('typing', {
//         recipient: selectedUser.name,
//         isTyping: false
//       });
//     }
//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }
//   };

//   const initiateVideoCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVideoCall', {
//         recipient: selectedUser.name
//       });
//     }
//   };

//   const initiateVoiceCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVoiceCall', {
//         recipient: selectedUser.name
//       });
//     }
//   };

//   const filteredUsers = users.filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (!joined) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
//           <div className="text-center mb-6">
//             <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-800">Welcome to Chat</h2>
//             <p className="text-gray-600 mt-2">Enter your name to start chatting</p>
//           </div>
//           <div className="space-y-4">
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
//               onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
//             />
//             <button 
//               onClick={handleJoin}
//               disabled={!username.trim()}
//               className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
//             >
//               Join Chat
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
//         {/* Sidebar Header */}
//         <div className="bg-gray-50 p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
//                 {username.charAt(0).toUpperCase()}
//               </div>
//               <span className="font-medium text-gray-800">{username}</span>
//             </div>
//             <button 
//               onClick={handleLogout}
//               className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
//               title="Logout"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>
//           </div>
          
//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>

//         {/* Users List */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredUsers.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//               <p>No users online</p>
//             </div>
//           ) : (
//             filteredUsers.map((user, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => selectUser(user)}
//                 className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
//                   selectedUser?.name === user.name ? 'bg-green-50 border-r-2 border-r-green-500' : ''
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-medium text-gray-800">{user.name}</h3>
//                     </div>
//                     <p className="text-sm text-gray-600">Online</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedUser ? (
//           <>
//             {/* Chat Header */}
//             <div className="bg-gray-50 p-4 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
//                     {selectedUser.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <h2 className="font-medium text-gray-800">{selectedUser.name}</h2>
//                     <p className="text-sm text-green-500">Online</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button 
//                     onClick={initiateVideoCall}
//                     className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
//                     title="Video Call"
//                   >
//                     <Video className="w-5 h-5" />
//                   </button>
//                   <button 
//                     onClick={initiateVoiceCall}
//                     className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
//                     title="Voice Call"
//                   >
//                     <Phone className="w-5 h-5" />
//                   </button>
//                   <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
//                     <MoreVertical className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//               {messages.length === 0 ? (
//                 <div className="text-center text-gray-500 mt-8">
//                   <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//                   <p>No messages yet. Start the conversation!</p>
//                 </div>
//               ) : (
//                 messages.map((msg, i) => (
//                   <div
//                     key={i}
//                     className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div
//                       className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                         msg.sender === username
//                           ? 'bg-green-500 text-white'
//                           : 'bg-white text-gray-800 shadow-sm'
//                       }`}
//                     >
//                       <p className="text-sm">{msg.text}</p>
//                       <p className={`text-xs mt-1 ${
//                         msg.sender === username ? 'text-green-100' : 'text-gray-500'
//                       }`}>
//                         {msg.timestamp}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
              
//               {/* Typing indicator */}
//               {typingUsers.size > 0 && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-200 px-4 py-2 rounded-lg">
//                     <p className="text-sm text-gray-600">
//                       {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
//                     </p>
//                   </div>
//                 </div>
//               )}
              
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message Input */}
//             <div className="bg-white p-4 border-t border-gray-200">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={handleMessageChange}
//                   placeholder={`Message ${selectedUser.name}...`}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       sendMessage(e);
//                     }
//                   }}
//                 />
//                 <button
//                   onClick={sendMessage}
//                   disabled={!message.trim()}
//                   className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 >
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center text-gray-500">
//               <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//               <h3 className="text-xl font-medium mb-2">Select a chat</h3>
//               <p>Choose a user from the sidebar to start messaging</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default App;