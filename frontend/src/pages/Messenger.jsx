import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

const Messenger = () => {
  const { state } = useLocation();
  const selectedUser = state?.user;
  const sharedPost = state?.post;

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isPostShared, setIsPostShared] = useState(false); // Track if the post has already been shared
  const [selectedUserForChat, setSelectedUserForChat] = useState(selectedUser); // Store selected user for chat

  // Fetch user suggestions
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["userSuggestions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  // If the user is already selected, don't fetch again
  useEffect(() => {
    if (selectedUser) {
      setSelectedUserForChat(selectedUser); // If already selected user, set it.
    }
  }, [selectedUser]);

  useEffect(() => {
    if (sharedPost && !isPostShared) {
      // Only share the post once
      const initialMessages = [{ post: sharedPost, text: "", timestamp: new Date() }];
      setMessages(initialMessages);
      localStorage.setItem("messages", JSON.stringify(initialMessages)); // Save messages to localStorage
      setIsPostShared(true); // Mark the post as shared
    }
  }, [sharedPost, isPostShared]);

  // Load messages from localStorage when component mounts
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(savedMessages);
  }, []);

  const sendMessage = () => {
    if (!messageText.trim()) {
      toast.error("Please enter a message before sending.");
      return;
    }

    const newMessage = {
      post: null, // Don't add the post content again
      text: messageText.trim(),
      timestamp: new Date(),
    };

    // Update messages state and localStorage
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages)); // Save messages to localStorage
    setMessageText("");
    toast.success("Message sent!");
  };

  const handleUserSelection = (user) => {
    setSelectedUserForChat(user);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  if (!selectedUserForChat) {
    return (
      <div className="p-8 text-center text-gray-500 text-lg">
        No user selected.
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar with list of users */}
      <div className="w-1/4 bg-gray-100 p-6 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <div>
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserSelection(user)}
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-gray-200 mb-2 ${
                selectedUserForChat && selectedUserForChat._id === user._id
                  ? "bg-blue-100"
                  : ""
              }`}
            >
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-6 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              {msg.post && (
                <div className="border border-gray-300 bg-white rounded-md p-4 mb-2">
                  <h3 className="text-lg font-semibold text-blue-700">{msg.post.title}</h3>
                  {msg.post.image && (
                    <img
                      src={msg.post.image}
                      alt="Post"
                      className="w-full h-48 object-cover mt-2 rounded"
                    />
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Category:</strong> {msg.post.category}
                  </p>
                  <p className="text-gray-700 mt-2">{msg.post.content}</p>
                </div>
              )}
              {msg.text && <p className="text-gray-800">{msg.text}</p>}
              <p className="text-xs text-right text-gray-500 mt-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Write a message..."
            rows="3"
            className="w-full border px-4 py-2 rounded-md shadow-sm"
          />
          <div className="mt-2 text-right">
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
