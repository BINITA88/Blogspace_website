import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1" : "/api/v1",
	withCredentials: true,
});
// import axios from "axios";

// // Axios instance based on environment
// export const axiosInstance = axios.create({
//   baseURL:
//     import.meta.env.MODE === "development"
//       ?  "http://localhost:5000/api/v1" : "/api/v1",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token automatically to each request if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Multipart/form-data config
// export const formConfig = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// };

// // Auth config with token
// const authConfig = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// };

// // Auth APIs
// export const registerUserApi = (data) =>
//   axiosInstance.post("/user/create", data);
// export const loginUserApi = (data) =>
//   axiosInstance.post("/user/login", data);
// export const forgotPasswordApi = (data) =>
//   axiosInstance.post("/user/forgot_password", data);
// export const resetPasswordApi = (data) =>
//   axiosInstance.post("/user/reset_password", data);
// export const verifyOtpApi = (data) =>
//   axiosInstance.post("/user/verify_otp", data);

// // User APIs
// export const getSingleUser = () =>
//   axiosInstance.get("/user/get_single_user", authConfig);
// export const getAllUsers = () =>
//   axiosInstance.get("/user/get_all_users", authConfig);
// export const searchUsers = (query) =>
//   axiosInstance.get(`/user/search_users?query=${query}`);
// export const getUnrequestedUsers = () =>
//   axiosInstance.get("/user/get_unrequested_users", authConfig);
// export const editUserProfileApi = (data) =>
//   axiosInstance.put("/user/update", data);
// export const uploadProfilePictureApi = (data) =>
//   axiosInstance.post("/user/profile_picture", data, formConfig);
// export const uploadCoverPhotoApi = (data) =>
//   axiosInstance.post("/user/upload_cover", data, formConfig);
// export const fetchCoverPhotoApi = () =>
//   axiosInstance.get("/user/fetch", authConfig);
// export const updateCoverPhotoApi = (data) =>
//   axiosInstance.put("/user/edit_cover", data, formConfig);
// export const deleteCoverPhotoApi = () =>
//   axiosInstance.delete("/user/delete_cover", authConfig);

// // Friend APIs
// export const sendFriendRequestApi = (data) =>
//   axiosInstance.post("/friend/friend_send", data);
// export const acceptFriendRequestApi = (id) =>
//   axiosInstance.put(`/friend/accept_friend/${id}`, authConfig);
// export const getAllFriendsApi = () =>
//   axiosInstance.get("/friend/friend_list", authConfig);
// export const getAllFriendRequestsApi = () =>
//   axiosInstance.get("/friend/fetch_friend_requests");
// export const removeFromFriendApi = (friendId) =>
//   axiosInstance.delete(`/friend/remove_friend/${friendId}`);
// export const fetchRemoveFriend = (id) =>
//   axiosInstance.get(`/friend/fetch_remove_friend/${id}`, authConfig);
// export const blockFriend = (friendId) =>
//   axiosInstance.put(`/friend/block/${friendId}`);
// export const unblockFriend = (friendId) =>
//   axiosInstance.put(`/friend/unblock_friend/${friendId}`);
// export const fetchBlockedUsers = () =>
//   axiosInstance.get("/friend/fetch_block_users", authConfig);

// // Post APIs
// export const createPost = (data) =>
//   axiosInstance.post("/post/create_post", data, formConfig);
// export const fetchPosts = () => axiosInstance.get("/post/get_all_posts");
// export const likePost = (postId) =>
//   axiosInstance.put(`/post/like_post/${postId}`);
// export const commentPost = (postId, data) =>
//   axiosInstance.put(`/post/comment_post/${postId}`, data);
// export const sharePost = (postId) =>
//   axiosInstance.put(`/post/share_Post/${postId}`);
// export const deletePost = (postId) =>
//   axiosInstance.delete(`/post/delete_post/${postId}`);
// export const updatePost = (postId, data) =>
//   axiosInstance.put(`/post/update_post/${postId}`, data);
// export const fetchUserPosts = () =>
//   axiosInstance.get("/post/user_posts", authConfig);
// export const getComments = () =>
//   axiosInstance.get("/post/get_comments", authConfig);

// // Chat APIs
// export const createChat = (data) =>
//   axiosInstance.post("/chat/create", data);
// export const getChat = () => axiosInstance.get("/chat/fetch");
// export const createGroupChat = (data) =>
//   axiosInstance.post("/chat/group", data);
// export const renameGroup = (data) =>
//   axiosInstance.put("/chat/rename", data);
// export const addUserToGroup = (data) =>
//   axiosInstance.put("/chat/groupadd", data);
// export const removeUserFromGroup = (data) =>
//   axiosInstance.put("/chat/groupremove", data);
// export const leaveGroup = (data) =>
//   axiosInstance.put("/chat/groupleave", data, authConfig);
// export const updateGroupChat = (data) =>
//   axiosInstance.put("/chat/updategroup", data);
// export const uploadGroupImage = (data) =>
//   axiosInstance.post("/chat/uploadgroupimage", data, formConfig);
// export const updateGroupImage = (data) =>
//   axiosInstance.put("/chat/updategroupimage", data, formConfig);

// // Message APIs
// export const sendMessage = (data) =>
//   axiosInstance.post("/message/send", data);
// export const allMessages = (id) =>
//   axiosInstance.get(`/message/${id}`);
// export const sendFileApi = (data) =>
//   axiosInstance.post("/message/send/file", data, formConfig);

// // Game APIs
// export const createGame = (data) =>
//   axiosInstance.post("/game/create", data, formConfig);
// export const getAllGames = () => axiosInstance.get("/game/get_all_game");
// export const updateGame = (gameId) =>
//   axiosInstance.put(`/game/update_game/${gameId}`, formConfig);
// export const deleteGame = (gameId) =>
//   axiosInstance.delete(`/game/delete_game/${gameId}`, formConfig);

// // Notification APIs
// export const fetchNotifications = () =>
//   axiosInstance.get("/notification/get_notifications", authConfig);
// export const markNotificationAsRead = (notificationId) =>
//   axiosInstance.put(`/notification/${notificationId}`);
// export const createNotification = (data) =>
//   axiosInstance.post("/notification/create_notification", data);

// // Story APIs
// export const createStories = (data) =>
//   axiosInstance.post("/story/create", data, formConfig);
// export const getAllStories = () =>
//   axiosInstance.get("/story/get_all_stories");
// export const editStories = (data) =>
//   axiosInstance.put("/story/edit_story", data, authConfig);
// export const deleteStories = () =>
//   axiosInstance.delete("/story/delete_story", authConfig);

// // Google login
// export const googleLoginApi = (data) =>
//   axiosInstance.post("/user/google", data);
// export const getUserByGoogleEmail = (data) =>
//   axiosInstance.post("/user/getGoogleUser", data);

// // Payment API
// export const initializeKhaltiPayment = (data) =>
//   axiosInstance.post("/payment/initialize_khalti", data);
