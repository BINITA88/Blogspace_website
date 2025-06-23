// // import { AuthContext } from "../../../context/AuthContext";
// import { extractTime } from "../../../utils/extractTime";
// import useConversation from "../../../zustand/useConversation";

// const Message = ({ message }) => {
// 	// Check if message exists and has the required properties
// 	if (!message || !message.senderId || !message.createdAt) {
// 		return null; // Return null to avoid rendering the component if message is invalid
// 	}
// 	const { selectedConversation } = useConversation();
// 	const loggedInUser = JSON.parse(localStorage.getItem("jwt"));
// 	const fromMe = loggedInUser?.user?._id === message.senderId; // Check if loggedInUser and user exist
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? loggedInUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500"; // Default background for others

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
// 				{message.message}
// 			</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
// 				{formattedTime}
// 			</div>
// 		</div>
// 	);
// };

// export default Message;

// import { extractTime } from "../../../utils/extractTime";
// import useConversation from "../../../zustand/useConversation";

// const Message = ({ message }) => {
//   // Handle case where message or user might be undefined
//   const jwt = localStorage.getItem("jwt");
//   const { user } = jwt ? JSON.parse(jwt) : { user: null };
//   const { selectedConversation } = useConversation();

//   if (!message) {
//     return null; // If no message is passed, render nothing
//   }

//   const fromMe = message.senderId === user?._id; // Use optional chaining
//   const formattedTime = message.createdAt
//     ? extractTime(message.createdAt)
//     : "Unknown Time"; // Handle missing createdAt
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const profilePic = fromMe
//     ? user?.profilePic || "/default-profile.png" // Fallback to default profile picture
//     : selectedConversation?.profilePic || "/default-profile.png";
//   const bubbleBgColor = fromMe ? "bg-blue-500" : "";
//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="Chat profile"
//             src={profilePic}
//             onError={(e) => (e.target.src = "/default-profile.png")} // Fallback if image fails to load
//           />
//         </div>
//       </div>
//       <div
//         className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
//       >
//         {message.message || "No message provided"} {/* Fallback for empty message */}
//       </div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
//      \
//         {formattedTime}
//       </div>
//     </div>
//   );
// };

// export default Message;
// ...............................new change.............................
// import { extractTime } from "../../../utils/extractTime";
// import useConversation from "../../../zustand/useConversation";

// const Message = ({ message }) => {
//   const jwt = localStorage.getItem("jwt");
//   const { user } = jwt ? JSON.parse(jwt) : { user: null };
//   const { selectedConversation } = useConversation();

//   if (!message) return null;

//   // Correcting the alignment logic
//   const fromMe = message.senderId === user?._id; // Message sent by logged-in user

//   return (
//     <div className={`flex w-full ${fromMe ? "justify-end" : "justify-start"} my-2`}>
//       <div
//         className={`max-w-[70%] px-4 py-2 rounded-lg text-left ${
//           fromMe ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
//         }`}
//       >
//         {message.message}
//         <div className="text-xs opacity-50 mt-1 text-right">{extractTime(message.createdAt)}</div>
//       </div>
//     </div>
//   );
// };

// export default Message;




// import React, { useState, useEffect, useRef } from 'react';
// import { MessageCircle, Send, Users, LogOut, Search, Phone, Video, MoreVertical } from 'lucide-react';
// import io from 'socket.io-client';

// // Socket connection
// let socket = null;

// function Messenge() {
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
//   const searchInputRef = useRef(null);


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
//     const getRandomSticker = () => {
//     const stickers = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'];
//     return stickers[Math.floor(Math.random() * stickers.length)];
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

//  const filteredUsers = users.filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (!joined) {
//     return (
//       <div className="min-h-screen w-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
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
          
//          Search
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={(e) => {
//                 // Prevent Enter key from doing anything in search
//                 if (e.key === 'Enter') {
//                   e.preventDefault();
//                   e.stopPropagation();
//                 }
//               }}
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
  
//                         <span className="text-lg">{getRandomSticker()}</span>
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

// export default Messenge;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Search, LogOut, Send, MessageCircle } from 'lucide-react';

let socket;

function Messenge() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const getRandomEmoji = () => {
    const emojis = ['😀', '😃', '😂', '🥳', '😎', '😉', '😁', '😇', '😊', '🤓'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/auth/me', { withCredentials: true })
      .then(res => setUsername(res.data.username))
      .catch(err => console.error('Error fetching user:', err));
  }, []);

  useEffect(() => {
    if (!username) return;

    socket = io('http://localhost:5000', {
      transports: ['websocket'],
      withCredentials: true,
    });

    socket.emit('join', username);

    axios.get('http://localhost:5000/api/v1/auth/userlist', { withCredentials: true })
      .then(res => {
        const filtered = res.data
          .filter(user => user.username !== username)
          .map(user => ({ name: user.username, id: user.id, status: 'offline' }));
        setUsers(filtered);
      });

    socket.on('userConnected', user =>
      setUsers(prev => prev.map(u => u.name === user ? { ...u, status: 'online' } : u)));

    socket.on('userDisconnected', user =>
      setUsers(prev => prev.map(u => u.name === user ? { ...u, status: 'offline' } : u)));

    socket.on('privateMessage', msg => {
      if (
        selectedUser &&
        ((msg.sender === username && msg.recipient === selectedUser.name) ||
          (msg.sender === selectedUser.name && msg.recipient === username))
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });

    socket.on('userTyping', data => {
      if (selectedUser && data.user === selectedUser.name) {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          data.isTyping ? newSet.add(data.user) : newSet.delete(data.user);
          return newSet;
        });
      }
    });

    return () => {
      socket.disconnect();
      socket = null;
    };
  }, [username, selectedUser]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
    setTypingUsers(new Set());

    if (socket) {
      socket.emit('getMessages', { user1: username, user2: user.name });

      const handleLoadMessages = (loadedMessages) => {
        setMessages(loadedMessages);
      };

      socket.on('loadMessages', handleLoadMessages);

      return () => {
        socket.off('loadMessages', handleLoadMessages);
      };
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socket || !selectedUser) return;

    const msgData = {
      recipient: selectedUser.name,
      text: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    socket.emit('privateMessage', msgData);
    setMessage('');
    handleTypingStop();
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (selectedUser && socket) {
      if (!isTyping) {
        setIsTyping(true);
        socket.emit('typing', { recipient: selectedUser.name, isTyping: true });
      }
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => handleTypingStop(), 1000);
    }
  };

  const handleTypingStop = () => {
    if (isTyping && selectedUser && socket) {
      setIsTyping(false);
      socket.emit('typing', { recipient: selectedUser.name, isTyping: false });
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    socket?.disconnect();
    setUsername('');
    setUsers([]);
    setSelectedUser(null);
    setMessages([]);
    setTypingUsers(new Set());
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <div className="w-1/3 border-r flex flex-col bg-white">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center">
                {username.charAt(0).toUpperCase()}
              </div>
              <span>{username}</span>
            </div>
            <button onClick={handleLogout} title="Logout" className="p-2 hover:bg-gray-200 rounded-full">
              <LogOut className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full bg-gray-100 focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user, idx) => (
            <div
              key={idx}
              onClick={() => handleUserSelect(user)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedUser?.name === user.name ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center relative">
                  {user.name.charAt(0).toUpperCase()}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3>{user.name}</h3>
                    <span className="text-xl">{getRandomEmoji()}</span>
                  </div>
                  <p className="text-sm text-gray-600">{user.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white">
              <div className="flex space-x-3 items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2>{selectedUser.name}</h2>
                  <p className="text-sm text-green-500">{selectedUser.status}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                    msg.sender === username ? 'bg-green-500 text-white' : 'bg-white text-gray-800 shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === username ? 'text-green-100' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {typingUsers.size > 0 && (
                <div className="bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600">
                  {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={`Message ${selectedUser.name}...`}
                  value={message}
                  onChange={handleTyping}
                  className="flex-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-green-500 p-2 text-white rounded-full hover:bg-green-600 disabled:bg-gray-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-medium mb-2">Select a chat</h3>
              <p>Choose a user from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messenge;


// import React, { useState, useEffect, useRef } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { MessageCircle, Send, Users, LogOut, Search, Phone, Video, MoreVertical } from 'lucide-react';
// import io from 'socket.io-client';

// let socket = null;

// function Messenge() {
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
//   const searchInputRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     // Try to load username from JWT cookie
//     const getUsernameFromCookie = () => {
//       const cookieString = document.cookie;
//       const cookies = cookieString.split(';').reduce((acc, cookie) => {
//         const [key, value] = cookie.trim().split('=');
//         acc[key] = value;
//         return acc;
//       }, {});
//       const jwtToken = cookies['jwt-linkedin'];
//       if (jwtToken) {
//         try {
//           const decoded = jwt_decode(jwtToken);
//           const user = decoded.username || decoded.name || `Guest_${Math.floor(Math.random() * 10000)}`;
//           setUsername(user);
//           setJoined(true);
//         } catch (error) {
//           console.error('Failed to decode JWT:', error);
//           const fallback = `Guest_${Math.floor(Math.random() * 10000)}`;
//           setUsername(fallback);
//           setJoined(true);
//         }
//       } else {
//         const fallback = `Guest_${Math.floor(Math.random() * 10000)}`;
//         setUsername(fallback);
//         setJoined(true);
//       }
//     };

//     getUsernameFromCookie();
//   }, []);

//   useEffect(() => {
//     if (joined && username) {
//       socket = io('http://localhost:5000', {
//         transports: ['websocket', 'polling'],
//       });

//       socket.emit('join', username);

//       socket.on('privateMessage', (messageData) => {
//         if (
//           selectedUser &&
//           ((messageData.sender === username && messageData.recipient === selectedUser.name) ||
//             (messageData.sender === selectedUser.name && messageData.recipient === username))
//         ) {
//           setMessages(prev => [...prev, messageData]);
//         }
//       });

//       socket.on('userList', (userList) => {
//         const filteredUsers = userList
//           .filter(user => user !== username)
//           .map(user => ({ name: user, id: user, status: 'online' }));
//         setUsers(filteredUsers);
//       });

//       socket.on('userConnected', (user) => {
//         console.log(`${user} joined the chat`);
//       });

//       socket.on('userDisconnected', (user) => {
//         console.log(`${user} left the chat`);
//         setUsers(prev => prev.filter(u => u.name !== user));
//         if (selectedUser && selectedUser.name === user) {
//           setSelectedUser(null);
//           setMessages([]);
//         }
//       });

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

//       socket.on('incomingVideoCall', (data) => {
//         const accept = window.confirm(`${data.caller} wants to start a video call. Accept?`);
//         socket.emit('callResponse', {
//           caller: data.caller,
//           accepted: accept,
//           callType: 'video',
//         });
//       });

//       socket.on('incomingVoiceCall', (data) => {
//         const accept = window.confirm(`${data.caller} wants to start a voice call. Accept?`);
//         socket.emit('callResponse', {
//           caller: data.caller,
//           accepted: accept,
//           callType: 'voice',
//         });
//       });

//       socket.on('callResponse', (data) => {
//         if (data.accepted) {
//           alert(`${data.responder} accepted your ${data.callType} call!`);
//         } else {
//           alert(`${data.responder} declined your ${data.callType} call.`);
//         }
//       });

//       socket.on('callEnded', (data) => {
//         alert(`Call with ${data.user} has ended.`);
//       });

//       socket.on('connect_error', (error) => {
//         console.error('Connection error:', error);
//         alert('Failed to connect to chat server.');
//       });

//       return () => {
//         if (socket) {
//           socket.disconnect();
//           socket = null;
//         }
//       };
//     }
//   }, [joined, username, selectedUser]);

//   useEffect(() => {
//     if (selectedUser && socket && username) {
//       socket.emit('getMessages', {
//         user1: username,
//         user2: selectedUser.name,
//       });

//       socket.on('loadMessages', (loadedMessages) => {
//         setMessages(loadedMessages);
//       });

//       setMessages([]);
//     }
//   }, [selectedUser, username]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() && socket && selectedUser) {
//       const messageData = {
//         recipient: selectedUser.name,
//         text: message.trim(),
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       socket.emit('privateMessage', messageData);
//       setMessage('');
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
//     setTypingUsers(new Set());
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//     if (selectedUser && socket) {
//       if (!isTyping) {
//         setIsTyping(true);
//         socket.emit('typing', { recipient: selectedUser.name, isTyping: true });
//       }
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//       typingTimeoutRef.current = setTimeout(() => {
//         handleTypingStop();
//       }, 1000);
//     }
//   };

//   const handleTypingStop = () => {
//     if (isTyping && selectedUser && socket) {
//       setIsTyping(false);
//       socket.emit('typing', { recipient: selectedUser.name, isTyping: false });
//     }
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//   };

//   const getRandomSticker = () => {
//     const stickers = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🙂', '🙃', '😉'];
//     return stickers[Math.floor(Math.random() * stickers.length)];
//   };

//   const initiateVideoCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVideoCall', { recipient: selectedUser.name });
//     }
//   };

//   const initiateVoiceCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVoiceCall', { recipient: selectedUser.name });
//     }
//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen bg-gray-100 flex">
//       <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
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
//               className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
//               title="Logout"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>
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
//                       <span className="text-lg">{getRandomSticker()}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">Online</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       <div className="flex-1 flex flex-col">
//         {selectedUser ? (
//           <>
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
//                     className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
//                     title="Video Call"
//                   >
//                     <Video className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={initiateVoiceCall}
//                     className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
//                     title="Voice Call"
//                   >
//                     <Phone className="w-5 h-5" />
//                   </button>
//                   <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
//                     <MoreVertical className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
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
//                       <p
//                         className={`text-xs mt-1 ${
//                           msg.sender === username ? 'text-green-100' : 'text-gray-500'
//                         }`}
//                       >
//                         {msg.timestamp}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//               {typingUsers.size > 0 && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-200 px-4 py-2 rounded-lg">
//                     <p className="text-sm text-gray-600">
//                       {Array.from(typingUsers).join(', ')}{' '}
//                       {typingUsers.size === 1 ? 'is' : 'are'} typing...
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
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

// export default Messenge;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { MessageCircle, Send, Users, LogOut, Search, Phone, Video, MoreVertical } from 'lucide-react';
// import io from 'socket.io-client';

// let socket = null;

// function Messenge() {
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
//   const searchInputRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Fetch current user from backend
//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/v1/auth/me', {
//           withCredentials: true,
//         });
//         const user = response.data.username || response.data.name;
//         if (user) {
//           setUsername(user);
//           setJoined(true);
//         } else {
//           alert('No user found. Please log in.');
//           window.location.href = '/login';
//         }
//       } catch (error) {
//         console.error('Error fetching current user:', error);
//         alert('You must be logged in to access the chat.');
//         window.location.href = '/login';
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (joined && username) {
//       socket = io('http://localhost:5000', {
//         transports: ['websocket', 'polling'],
//         withCredentials: true
//       });

//       socket.emit('join', username);

//       socket.on('privateMessage', (messageData) => {
//         if (
//           selectedUser &&
//           ((messageData.sender === username && messageData.recipient === selectedUser.name) ||
//             (messageData.sender === selectedUser.name && messageData.recipient === username))
//         ) {
//           setMessages(prev => [...prev, messageData]);
//         }
//       });

//       socket.on('userList', (userList) => {
//         const filteredUsers = userList
//           .filter(user => user !== username)
//           .map(user => ({ name: user, id: user, status: 'online' }));
//         setUsers(filteredUsers);
//       });

//       socket.on('userConnected', (user) => {
//         console.log(`${user} joined the chat`);
//       });

//       socket.on('userDisconnected', (user) => {
//         console.log(`${user} left the chat`);
//         setUsers(prev => prev.filter(u => u.name !== user));
//         if (selectedUser && selectedUser.name === user) {
//           setSelectedUser(null);
//           setMessages([]);
//         }
//       });

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

//       socket.on('incomingVideoCall', (data) => {
//         const accept = window.confirm(`${data.caller} wants to start a video call. Accept?`);
//         socket.emit('callResponse', {
//           caller: data.caller,
//           accepted: accept,
//           callType: 'video',
//         });
//       });

//       socket.on('incomingVoiceCall', (data) => {
//         const accept = window.confirm(`${data.caller} wants to start a voice call. Accept?`);
//         socket.emit('callResponse', {
//           caller: data.caller,
//           accepted: accept,
//           callType: 'voice',
//         });
//       });

//       socket.on('callResponse', (data) => {
//         if (data.accepted) {
//           alert(`${data.responder} accepted your ${data.callType} call!`);
//         } else {
//           alert(`${data.responder} declined your ${data.callType} call.`);
//         }
//       });

//       socket.on('callEnded', (data) => {
//         alert(`Call with ${data.user} has ended.`);
//       });

//       socket.on('connect_error', (error) => {
//         console.error('Connection error:', error);
//         alert('Failed to connect to chat server.');
//       });

//       return () => {
//         if (socket) {
//           socket.disconnect();
//           socket = null;
//         }
//       };
//     }
//   }, [joined, username, selectedUser]);

//   useEffect(() => {
//     if (selectedUser && socket && username) {
//       socket.emit('getMessages', {
//         user1: username,
//         user2: selectedUser.name,
//       });

//       socket.on('loadMessages', (loadedMessages) => {
//         setMessages(loadedMessages);
//       });

//       setMessages([]);
//     }
//   }, [selectedUser, username]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() && socket && selectedUser) {
//       const messageData = {
//         recipient: selectedUser.name,
//         text: message.trim(),
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       socket.emit('privateMessage', messageData);
//       setMessage('');
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
//     setTypingUsers(new Set());
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//     if (selectedUser && socket) {
//       if (!isTyping) {
//         setIsTyping(true);
//         socket.emit('typing', { recipient: selectedUser.name, isTyping: true });
//       }
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//       typingTimeoutRef.current = setTimeout(() => {
//         handleTypingStop();
//       }, 1000);
//     }
//   };

//   const handleTypingStop = () => {
//     if (isTyping && selectedUser && socket) {
//       setIsTyping(false);
//       socket.emit('typing', { recipient: selectedUser.name, isTyping: false });
//     }
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//   };

//   const getRandomSticker = () => {
//     const stickers = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🙂', '🙃', '😉'];
//     return stickers[Math.floor(Math.random() * stickers.length)];
//   };

//   const initiateVideoCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVideoCall', { recipient: selectedUser.name });
//     }
//   };

//   const initiateVoiceCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVoiceCall', { recipient: selectedUser.name });
//     }
//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
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
//               className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
//               title="Logout"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>
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
//                       <span className="text-lg">{getRandomSticker()}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">Online</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       {/* Chat area - same as before */}
//       {/* ... */}
//     </div>
//   );
// }

// export default Messenge;




// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { MessageCircle, Send, Users, LogOut, Search, Phone, Video, MoreVertical } from 'lucide-react';
// import io from 'socket.io-client';

// let socket = null;

// function Messenge() {
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
//   const searchInputRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/v1/auth/me', {
//           withCredentials: true,
//         });
//         const user = response.data.username || response.data.name;
//         if (user) {
//           setUsername(user);
//           setJoined(true);
//         } else {
//           alert('No user found. Please log in.');
//           window.location.href = '/login';
//         }
//       } catch (error) {
//         console.error('Error fetching current user:', error);
//         alert('You must be logged in to access the chat.');
//         window.location.href = '/login';
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (joined && username) {
//       socket = io('http://localhost:5000', {
//         transports: ['websocket', 'polling'],
//         withCredentials: true,
//       });

//       socket.emit('join', username);

//       socket.on('privateMessage', (messageData) => {
//         if (
//           selectedUser &&
//           ((messageData.sender === username && messageData.recipient === selectedUser.name) ||
//             (messageData.sender === selectedUser.name && messageData.recipient === username))
//         ) {
//           setMessages(prev => [...prev, messageData]);
//         }
//       });

//       socket.on('userList', (userList) => {
//         // Assuming backend sends an array of usernames or objects
//         const allUsers = userList.map(user => {
//           if (typeof user === 'string') {
//             return { name: user, id: user, status: 'online' }; // Or add offline logic if available
//           }
//           return user;
//         });
//         setUsers(allUsers);
//       });

//       socket.on('userConnected', (user) => {
//         console.log(`${user} joined the chat`);
//       });

//       socket.on('userDisconnected', (user) => {
//         console.log(`${user} left the chat`);
//       });

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

//       return () => {
//         if (socket) {
//           socket.disconnect();
//           socket = null;
//         }
//       };
//     }
//   }, [joined, username, selectedUser]);

//   useEffect(() => {
//     if (selectedUser && socket && username) {
//       socket.emit('getMessages', {
//         user1: username,
//         user2: selectedUser.name,
//       });

//       socket.on('loadMessages', (loadedMessages) => {
//         setMessages(loadedMessages);
//       });

//       setMessages([]);
//     }
//   }, [selectedUser, username]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() && socket && selectedUser) {
//       const messageData = {
//         recipient: selectedUser.name,
//         text: message.trim(),
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       socket.emit('privateMessage', messageData);
//       setMessage('');
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
//     setTypingUsers(new Set());
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//     if (selectedUser && socket) {
//       if (!isTyping) {
//         setIsTyping(true);
//         socket.emit('typing', { recipient: selectedUser.name, isTyping: true });
//       }
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//       typingTimeoutRef.current = setTimeout(() => {
//         handleTypingStop();
//       }, 1000);
//     }
//   };

//   const handleTypingStop = () => {
//     if (isTyping && selectedUser && socket) {
//       setIsTyping(false);
//       socket.emit('typing', { recipient: selectedUser.name, isTyping: false });
//     }
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//   };

//   const getRandomSticker = () => {
//     const stickers = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🙂', '🙃', '😉'];
//     return stickers[Math.floor(Math.random() * stickers.length)];
//   };

//   const initiateVideoCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVideoCall', { recipient: selectedUser.name });
//     }
//   };

//   const initiateVoiceCall = () => {
//     if (selectedUser && socket) {
//       socket.emit('initiateVoiceCall', { recipient: selectedUser.name });
//     }
//   };

//   // Search field logic
//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
//         {/* Sidebar header */}
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
//               className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
//               title="Logout"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Search with clear button */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value.trimStart())}
//               className="w-full pl-10 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 title="Clear search"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Users List */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredUsers.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//               <p>No users found</p>
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
//                     <div className={`absolute bottom-0 right-0 w-3 h-3 ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'} border-2 border-white rounded-full`}></div>
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-medium text-gray-800">{user.name}</h3>
//                       <span className="text-lg">{getRandomSticker()}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       {user.status === 'online' ? 'Online' : 'Offline'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chat area */}
//       {/* Keep the rest of the chat area code as is (same as before) */}
//       {/* ... */}
//     </div>
//   );
// }

// export default Messenge;



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { Search, LogOut, Send, MessageCircle } from 'lucide-react';

// let socket;

// function Messenge() {
//   const [username, setUsername] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [message, setMessage] = useState('');
//   const [typingUsers, setTypingUsers] = useState(new Set());
//   const messagesEndRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     // Fetch current user info
//     axios.get('http://localhost:5000/api/v1/auth/me', { withCredentials: true })
//       .then(res => {
//         setUsername(res.data.username);
//       })
//       .catch(err => {
//         console.error('Error fetching current user:', err);
//       });
//   }, []);

//   useEffect(() => {
//     if (username) {
//       // Initialize socket connection
//       socket = io('http://localhost:5000', {
//         transports: ['websocket'],
//         withCredentials: true,
//       });

//       socket.emit('join', username);

//       // Fetch all users
//       axios.get('http://localhost:5000/api/v1/auth/userlist', { withCredentials: true })
//         .then(res => {
//           const allUsers = res.data
//             .filter(user => user.username !== username)
//             .map(user => ({
//               name: user.username,
//               id: user.id,
//               status: 'offline',
//             }));
//           setUsers(allUsers);
//         })
//         .catch(err => {
//           console.error('Error fetching users:', err);
//         });

//       // Listen for user status updates
//       socket.on('userConnected', user => {
//         setUsers(prevUsers =>
//           prevUsers.map(u =>
//             u.name === user ? { ...u, status: 'online' } : u
//           )
//         );
//       });

//       socket.on('userDisconnected', user => {
//         setUsers(prevUsers =>
//           prevUsers.map(u =>
//             u.name === user ? { ...u, status: 'offline' } : u
//           )
//         );
//       });

//       // Listen for incoming messages
//       socket.on('privateMessage', messageData => {
//         if (
//           selectedUser &&
//           ((messageData.sender === username && messageData.recipient === selectedUser.name) ||
//             (messageData.sender === selectedUser.name && messageData.recipient === username))
//         ) {
//           setMessages(prev => [...prev, messageData]);
//         }
//       });

//       // Listen for typing indicators
//       socket.on('userTyping', data => {
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

//       return () => {
//         if (socket) {
//           socket.disconnect();
//           socket = null;
//         }
//       };
//     }
//   }, [username, selectedUser]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleUserSelect = user => {
//     setSelectedUser(user);
//     setMessages([]);
//     setTypingUsers(new Set());

//     // Fetch chat history
//     socket.emit('getMessages', {
//       user1: username,
//       user2: user.name,
//     });

//     socket.on('loadMessages', loadedMessages => {
//       setMessages(loadedMessages);
//     });
//   };

//   const handleSendMessage = e => {
//     e.preventDefault();
//     if (message.trim() && socket && selectedUser) {
//       const messageData = {
//         recipient: selectedUser.name,
//         text: message.trim(),
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       socket.emit('privateMessage', messageData);
//       setMessage('');
//       handleTypingStop();
//     }
//   };

//   const handleTyping = e => {
//     setMessage(e.target.value);
//     if (selectedUser && socket) {
//       if (!isTyping) {
//         setIsTyping(true);
//         socket.emit('typing', { recipient: selectedUser.name, isTyping: true });
//       }
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//       typingTimeoutRef.current = setTimeout(() => {
//         handleTypingStop();
//       }, 1000);
//     }
//   };

//   const handleTypingStop = () => {
//     if (isTyping && selectedUser && socket) {
//       setIsTyping(false);
//       socket.emit('typing', { recipient: selectedUser.name, isTyping: false });
//     }
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleLogout = () => {
//     if (socket) {
//       socket.disconnect();
//       socket = null;
//     }
//     setUsername('');
//     setUsers([]);
//     setSelectedUser(null);
//     setMessages([]);
//     setSearchTerm('');
//     setTypingUsers(new Set());
//   };

//   return (
//     <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
//       {/* Sidebar */}
//       <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
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
//               className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"
//               title="Logout"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {filteredUsers.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//               <p>No users found</p>
//             </div>
//           ) : (
//             filteredUsers.map((user, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => handleUserSelect(user)}
//                 className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
//                   selectedUser?.name === user.name ? 'bg-green-50 border-r-2 border-r-green-500' : ''
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                     <div className={`absolute bottom-0 right-0 w-3 h-3 ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'} border-2 border-white rounded-full`}></div>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-medium text-gray-800">{user.name}</h3>
//                     <p className="text-sm text-gray-600">
//                       {user.status === 'online' ? 'Online' : 'Offline'}
//                     </p>
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
//             <div className="bg-gray-50 p-4 border-b border-gray-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
//                   {selectedUser.name.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <h2 className="font-medium text-gray-800">{selectedUser.name}</h2>
//                   <p className="text-sm text-green-500">{selectedUser.status === 'online' ? 'Online' : 'Offline'}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//               {messages.length === 0 ? (
//                 <div className="text-center text-gray-500 mt-8">
//                                     <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
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
//                       <p
//                         className={`text-xs mt-1 ${
//                           msg.sender === username ? 'text-green-100' : 'text-gray-500'
//                         }`}
//                       >
//                         {msg.timestamp}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//               {typingUsers.size > 0 && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-200 px-4 py-2 rounded-lg">
//                     <p className="text-sm text-gray-600">
//                       {Array.from(typingUsers).join(', ')}{' '}
//                       {typingUsers.size === 1 ? 'is' : 'are'} typing...
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message input box */}
//             <div className="bg-white p-4 border-t border-gray-200">
//               <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={handleTyping}
//                   placeholder={`Message ${selectedUser.name}...`}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//                 <button
//                   type="submit"
//                   disabled={!message.trim()}
//                   className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 >
//                   <Send className="w-5 h-5" />
//                 </button>
//               </form>
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

// export default Messenge;

 
