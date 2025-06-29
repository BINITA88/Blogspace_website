// // import { useState } from "react";
// // import Post from "../components/Post";
// // import { Bookmark } from "lucide-react";
// // import { Link, useNavigate } from "react-router-dom";
// // import Carousel from "../components/Carousel";
// // import Select from "react-select";
// // import { useQuery } from "@tanstack/react-query";
// // import { axiosInstance } from "../lib/axios";

// // const Postt = () => {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedUsers, setSelectedUsers] = useState({});
// //   const navigate = useNavigate();

// //   const { data: posts = [] } = useQuery({
// //     queryKey: ["posts"],
// //     queryFn: async () => {
// //       const res = await axiosInstance.get("/posts");
// //       return res.data;
// //     },
// //   });


// //   const { data: users = [] } = useQuery({
// //     queryKey: ["users"],
// //     queryFn: async () => {
// //       const res = await axiosInstance.get("/users/suggestions");
// //       return res.data;
// //     },
// //   });

// //   const userOptions = users.map((user) => ({
// //     value: user._id,
// //     label: user.name,
// //     user,
// //   }));

// //   const filteredPosts = posts.filter(
// //     (post) =>
// //       post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       post.category?.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const handleSharePost = (postId) => {
// //     const selectedOption = selectedUsers[postId];
// //     if (!selectedOption) return;

// //     const selectedUser = selectedOption.user;
// //     const post = posts.find((p) => p._id === postId);

// //     navigate("/messenger", {
// //       state: { user: selectedUser, post, messageText: post.content },
// //     });
// //   };

// //   return (
// //     <div className="p-6">
// //       <Carousel />
// //       <div className="max-w-xl mx-auto mt-8 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Search posts..."
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {filteredPosts.map((post) => (
// //           <div key={post._id} className="bg-white rounded-lg p-4 shadow relative">
// //             <button className="absolute top-2 right-2 text-blue-500">
// //               <Bookmark size={20} />
// //             </button>

// //             <Link to={`/post/${post._id}`}>
// //               <Post post={post} />
// //             </Link>

// //             <div className="mt-4">
// //               <Select
// //                 options={userOptions}
// //                 placeholder="Share with..."
// //                 onChange={(selectedOption) =>
// //                   setSelectedUsers((prev) => ({
// //                     ...prev,
// //                     [post._id]: selectedOption,
// //                   }))
// //                 }
// //               />
// //               <button
// //                 className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //                 onClick={() => handleSharePost(post._id)}
// //               >
// //                 Share Post
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Postt;
// import { useState, useEffect } from "react";
// import Post from "../components/Post";
// import { Bookmark, BookmarkCheck, Users } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import Carousel from "../components/Carousel";
// import Select from "react-select";
// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";

// const Postt = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState({});
//   const [savedPosts, setSavedPosts] = useState([]);

//   const navigate = useNavigate();

//   const { data: posts = [] } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/posts");
//       return res.data;
//     },
//   });

//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/users/suggestions");
//       return res.data;
//     },
//   });

//   // Load bookmarks from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     setSavedPosts(saved);
//   }, []);

//   const isSaved = (postId) => savedPosts.some((p) => p._id === postId);

//   const toggleSavePost = (post) => {
//     const existing = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     const alreadySaved = existing.find((p) => p._id === post._id);

//     let updated;
//     if (alreadySaved) {
//       updated = existing.filter((p) => p._id !== post._id);
//     } else {
//       updated = [...existing, post];
//     }

//     localStorage.setItem("savedPosts", JSON.stringify(updated));
//     setSavedPosts(updated);
//   };

//   const userOptions = users.map((user) => ({
//     value: user._id,
//     label: user.name,
//     user,
//   }));

//   const filteredPosts = posts.filter((post) =>
//     post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     post.category?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSharePost = (postId) => {
//     const selectedOption = selectedUsers[postId];
//     if (!selectedOption) return;

//     const selectedUser = selectedOption.user;
//     const post = posts.find((p) => p._id === postId);

//     navigate("/messenger", {
//       state: { user: selectedUser, post, messageText: post.content },
//     });
//   };

//   return (
//     <div className="p-6">
//       {posts?.length > 0 && <Carousel />}

//       <div className="max-w-xl mx-auto mt-8 mb-6">
//         <input
//           type="text"
//           placeholder="Search posts..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredPosts.map((post) => (
//           <div key={post._id} className="bg-white rounded-lg p-4 shadow relative">
//             {/* Bookmark Icon */}
//             <button
//               onClick={() => toggleSavePost(post)}
//               className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-blue-100"
//             >
//               {isSaved(post._id) ? (
//                 <BookmarkCheck size={20} className="text-blue-500" />
//               ) : (
//                 <Bookmark size={20} className="text-blue-500" />
//               )}
//             </button>

//             {/* Post Content */}
//             <Link to={`/post/${post._id}`}>
//               <Post post={post} />
//             </Link>

//             {/* Share Selector */}
//             <div className="mt-4">
//               <Select
//                 options={userOptions}
//                 placeholder="Share with..."
//                 onChange={(selectedOption) =>
//                   setSelectedUsers((prev) => ({
//                     ...prev,
//                     [post._id]: selectedOption,
//                   }))
//                 }
//               />
//               <button
//                 className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                 onClick={() => handleSharePost(post._id)}
//               >
//                 Share Post
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Show if no posts found */}
//         {filteredPosts.length === 0 && (
//           <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
//             <div className="mb-6">
//               <Users size={64} className="mx-auto text-blue-500" />
//             </div>
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Found</h2>
//             <p className="text-gray-600">Try a different search or connect with others.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Postt;



// import { useState, useEffect } from "react";
// import Post from "../components/Post";
// import { Bookmark, BookmarkCheck, Users, Search, Clock, Eye, Heart, MessageCircle } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import Carousel from "../components/Carousel";
// import Select from "react-select";
// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";

// const Postt = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState({});
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const navigate = useNavigate();

//   const { data: posts = [] } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/posts");
//       return res.data;
//     },
//   });

//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/users/suggestions");
//       return res.data;
//     },
//   });

//   // Load bookmarks from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     setSavedPosts(saved);
//   }, []);

//   const isSaved = (postId) => savedPosts.some((p) => p._id === postId);

//   const toggleSavePost = (post) => {
//     const existing = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     const alreadySaved = existing.find((p) => p._id === post._id);

//     let updated;
//     if (alreadySaved) {
//       updated = existing.filter((p) => p._id !== post._id);
//     } else {
//       updated = [...existing, post];
//     }

//     localStorage.setItem("savedPosts", JSON.stringify(updated));
//     setSavedPosts(updated);
//   };

//   const userOptions = users.map((user) => ({
//     value: user._id,
//     label: user.name,
//     user,
//   }));

//   const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))];

//   const filteredPosts = posts.filter((post) => {
//     const matchesSearch =
//       post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.content?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "All" || post.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleSharePost = (postId) => {
//     const selectedOption = selectedUsers[postId];
//     if (!selectedOption) return;
//     const selectedUser = selectedOption.user;
//     const post = posts.find((p) => p._id === postId);

//     navigate("/messenger", {
//       state: { user: selectedUser, post, messageText: post.content },
//     });
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Carousel */}
//       {posts?.length > 0 && (
//         <div className="mb-8">
//           <Carousel />
//         </div>
//       )}

//       {/* Search and Category Filter */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
//           {/* Search */}
//           <div className="flex items-center bg-white rounded-full shadow px-4 py-2 w-full md:w-1/2">
//             <Search className="text-gray-400 mr-2" size={20} />
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="outline-none w-full text-gray-700"
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="flex gap-2 flex-wrap">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full border ${
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"
//                 } text-sm font-medium transition-all`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Posts Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredPosts.length > 0 ? (
//           filteredPosts.map((post) => (
//           <div
//   key={post._id}
//   className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden relative flex flex-col"
// >
//   {/* Bookmark Icon */}
//   <button
//     onClick={() => toggleSavePost(post)}
//     className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
//   >
//     {isSaved(post._id) ? (
//       <BookmarkCheck size={20} className="text-blue-500" />
//     ) : (
//       <Bookmark size={20} className="text-blue-500" />
//     )}
//   </button>

//   {/* Post Image */}
//   {post.image ? (
//     <img
//       src={post.image}
//       alt={post.title || "Post Image"}
//       className="w-full h-44 object-cover"
//     />
//   ) : (
//     <div className="w-full h-44 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-4xl text-white font-bold">
//       {post.title?.charAt(0)?.toUpperCase() || "P"}
//     </div>
//   )}

//   {/* Post Content */}
//   <div className="p-4 flex flex-col flex-grow">
//     {/* Category */}
//     {post.category && (
//       <span className="inline-block mb-2 text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full self-start">
//         {post.category}
//       </span>
//     )}

//     {/* Title */}
//     {post.title ? (
//       <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
//         <Link to={`/post/${post._id}`}>{post.title}</Link>
//       </h3>
//     ) : null}

//     {/* Description */}
//     {post.content && (
//       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//         {post.content.substring(0, 100)}...
//       </p>
//     )}

//     {/* Footer */}
//     <div className="mt-auto">
//       {/* Author & Date */}
//       <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
//         <div className="flex items-center gap-2">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-medium">
//             {post.author?.name?.charAt(0)?.toUpperCase() || "A"}
//           </div>
//           <span>{post.author?.name || "Anonymous"}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <Clock size={12} />
//           <span>{formatDate(post.createdAt || new Date())}</span>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="flex items-center justify-between border-t border-gray-100 pt-2">
//         <div className="flex items-center gap-3 text-xs text-gray-500">
//           <div className="flex items-center gap-1">
//             <Eye size={14} />
//             <span>{typeof post.views === "number" ? post.views : 0}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Heart size={14} />
//             <span>
//               {typeof post.likes === "number"
//                 ? post.likes
//                 : post.likes?.length || 0}
//             </span>
//           </div>
//           <div className="flex items-center gap-1">
//             <MessageCircle size={14} />
//             <span>{post.comments?.length || 0}</span>
//           </div>
//         </div>
//       </div>

//       {/* Share Section */}
//       <div className="mt-3">
//         <Select
//           options={userOptions}
//           placeholder="Share with..."
//           value={selectedUsers[post._id] || null}
//           onChange={(selectedOption) =>
//             setSelectedUsers((prev) => ({
//               ...prev,
//               [post._id]: selectedOption,
//             }))
//           }
//           className="text-sm mb-2"
//         />
//         <button
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           onClick={() => handleSharePost(post._id)}
//           disabled={!selectedUsers[post._id]}
//         >
//           Share Post
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//           ))
//         ) : (
//           <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
//             <div className="mb-6">
//               <Users size={64} className="mx-auto text-blue-500" />
//             </div>
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Found</h2>
//             <p className="text-gray-600">Try a different search or connect with others.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Postt;


// import { useState, useEffect } from "react";
// import Post from "../components/Post";
// import {
//   Bookmark,
//   BookmarkCheck,
//   Users,
//   Search,
//   Clock,
//   Eye,
//   Heart,
//   MessageCircle,
//   Share2,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import Carousel from "../components/Carousel";
// import Select from "react-select";
// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";

// const Postt = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState({});
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [showShare, setShowShare] = useState({});

//   const navigate = useNavigate();

//   const { data: posts = [] } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/posts");
//       return res.data;
//     },
//   });

//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/users/suggestions");
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     setSavedPosts(saved);
//   }, []);

//   const isSaved = (postId) => savedPosts.some((p) => p._id === postId);

//   const toggleSavePost = (post) => {
//     const existing = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     const alreadySaved = existing.find((p) => p._id === post._id);

//     let updated;
//     if (alreadySaved) {
//       updated = existing.filter((p) => p._id !== post._id);
//     } else {
//       updated = [...existing, post];
//     }

//     localStorage.setItem("savedPosts", JSON.stringify(updated));
//     setSavedPosts(updated);
//   };

//   const userOptions = users.map((user) => ({
//     value: user._id,
//     label: user.name,
//     user,
//   }));

//   const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))];

//   const filteredPosts = posts.filter((post) => {
//     const matchesSearch =
//       post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.content?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "All" || post.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleSharePost = (postId) => {
//     const selectedOption = selectedUsers[postId];
//     if (!selectedOption) return;
//     const selectedUser = selectedOption.user;
//     const post = posts.find((p) => p._id === postId);

//     navigate("/messenger", {
//       state: { user: selectedUser, post, messageText: post.content },
//     });
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const handleCardClick = (postId) => {
//     navigate(`/post/${postId}`);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {posts?.length > 0 && (
//         <div className="mb-8">
//           <Carousel />
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto mt-28 mb-8">
//         <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
//           {/* <div className="flex items-center bg-white rounded-full shadow px-4 py-2 w-full md:w-1/2">
//             <Search className="text-gray-400 mr-2" size={15} />
//             <input
//               type="text"
//               placeholder="Search posts..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="outline-none w-full text-gray-700"
//             />
//           </div> */}

//           <div className="flex gap-2 flex-wrap">
//             {categories.map((category) => (
// <button
//   key={category}
//   onClick={() => setSelectedCategory(category)}
//   className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
//     selectedCategory === category
//       ? "text-white border-0"
//       : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"
//   }`}
//   style={
//     selectedCategory === category
//       ? { backgroundColor: "#159A9C" }
//       : {}
//   }
// >
//   {category}
// </button>

//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredPosts.length > 0 ? (
//           filteredPosts.map((post) => (
//             <div
//               key={post._id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden relative flex flex-col cursor-pointer"
//               onClick={() => handleCardClick(post._id)}
//             >
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleSavePost(post);
//                 }}
//                 className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
//               >
//                 {isSaved(post._id) ? (
//                   <BookmarkCheck size={20} className="text-blue-500" />
//                 ) : (
//                   <Bookmark size={20} className="text-blue-500" />
//                 )}
//               </button>

//               {post.image ? (
//                 <img
//                   src={post.image}
//                   alt={post.title || "Post Image"}
//                   className="w-full h-44 object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-44 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-4xl text-white font-bold">
//                   {post.title?.charAt(0)?.toUpperCase() || "P"}
//                 </div>
//               )}

//               <div className="p-4 flex flex-col flex-grow">
//                 {post.category && (
//                   <span className="inline-block mb-2 text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full self-start">
//                     {post.category}
//                   </span>
//                 )}

//                 {post.title && (
//                   <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
//                     {post.title}
//                   </h3>
//                 )}

//                 {post.content && (
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                     {post.content.substring(0, 100)}...
//                   </p>
//                 )}

//                 <div className="mt-auto">
//                   <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
//                     <div className="flex items-center gap-2">
//                       <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-medium">
//                         {post.author?.name?.charAt(0)?.toUpperCase() || "A"}
//                       </div>
//                       <span>{post.author?.name || "Anonymous"}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock size={12} />
//                       <span>{formatDate(post.createdAt || new Date())}</span>
//                     </div>
//                   </div>

//               <div className="flex items-center justify-between border-t border-gray-100 pt-2">
//   <div className="flex items-center gap-3 text-xs text-gray-500">
//     <div className="flex items-center gap-1">
//       <Eye size={14} />
//       <span>{typeof post.views === "number" ? post.views : 0}</span>
//     </div>
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         handleLike(post._id); // implement this function!
//       }}
//       className="flex items-center gap-1 hover:text-red-500 transition"
//     >
//       <Heart size={14} />
//       <span>
//         {typeof post.likes === "number"
//           ? post.likes
//           : post.likes?.length || 0}
//       </span>
//     </button>
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         handleComment(post._id); // implement this function!
//       }}
//       className="flex items-center gap-1 hover:text-blue-500 transition"
//     >
//       <MessageCircle size={14} />
//       <span>{post.comments?.length || 0}</span>
//     </button>
//   </div>
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       setShowShare((prev) => ({
//         ...prev,
//         [post._id]: !prev[post._id],
//       }));
//     }}
//     className="text-blue-600 hover:text-blue-800 transition"
//   >
//     <Share2 size={16} />
//   </button>
// </div>
//                   {showShare[post._id] && (
//                     <div className="mt-3">
//                       <Select
//                         options={userOptions}
//                         placeholder="Share with..."
//                         value={selectedUsers[post._id] || null}
//                         onChange={(selectedOption) =>
//                           setSelectedUsers((prev) => ({
//                             ...prev,
//                             [post._id]: selectedOption,
//                           }))
//                         }
//                         className="text-sm mb-2"
//                       />
//                       <button
//                         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleSharePost(post._id);
//                         }}
//                         disabled={!selectedUsers[post._id]}
//                       >
//                         Share Post
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
//             <div className="mb-6">
//               <Users size={64} className="mx-auto text-blue-500" />
//             </div>
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Found</h2>
//             <p className="text-gray-600">Try a different search or connect with others.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Postt;



// import { useState, useEffect } from "react";
// import {
//   Bookmark,
//   BookmarkCheck,
//   Clock,
//   Eye,
//   Heart,
//   MessageCircle,
//   Share2,
//   Users,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Carousel from "../components/Carousel";
// import Select from "react-select";
// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import BookPost from "../components/BookPost";

// const Postt = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState({});
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [showShare, setShowShare] = useState({});
//   const [openedPost, setOpenedPost] = useState(null);

//   const navigate = useNavigate();

//   const { data: posts = [] } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/posts");
//       return res.data;
//     },
//   });

//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/users/suggestions");
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     setSavedPosts(saved);
//   }, []);

//   const isSaved = (postId) => savedPosts.some((p) => p._id === postId);

//   const toggleSavePost = (post) => {
//     const existing = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     const alreadySaved = existing.find((p) => p._id === post._id);
//     const updated = alreadySaved ? existing.filter((p) => p._id !== post._id) : [...existing, post];
//     localStorage.setItem("savedPosts", JSON.stringify(updated));
//     setSavedPosts(updated);
//   };

//   const handleSharePost = (postId) => {
//     const selectedOption = selectedUsers[postId];
//     if (!selectedOption) return;
//     const selectedUser = selectedOption.user;
//     const post = posts.find((p) => p._id === postId);

//     navigate("/messenger", {
//       state: { user: selectedUser, post, messageText: post.content },
//     });
//   };

//   const handleLike = (postId) => console.log("Liked post", postId);
//   const handleComment = (postId) => console.log("Commented on post", postId);

//   const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))];

//   const filteredPosts = posts.filter((post) => {
//     const q = searchQuery.toLowerCase();
//     const matchesSearch = post.title?.toLowerCase().includes(q) || post.category?.toLowerCase().includes(q) || post.content?.toLowerCase().includes(q);
//     const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const userOptions = users.map((user) => ({ value: user._id, label: user.name, user }));

//   return (
//     <div className="p-6 bg-gray-50 ">
//       {openedPost && (
//         <div className="mb-8">
//           {/* <button onClick={() => setOpenedPost(null)} className="bg-gray-800 text-white px-4 py-2 rounded mb-4">
//             ⬅ Back to All Posts
//           </button> */}
//           <BookPost
//             post={openedPost}
//             isSaved={isSaved(openedPost._id)}
//             onToggleSave={toggleSavePost}
//             onShare={handleSharePost}
//             onLike={handleLike}
//             onComment={handleComment}
//           />
//         </div>
//       )}

//       {!openedPost && (
//         <>
//           {posts?.length > 0 && <div className="mb-8"><Carousel /></div>}

//           <div className="max-w-7xl mx-auto mt-28 mb-8 flex gap-2 flex-wrap justify-center">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${selectedCategory === category ? "text-white border-0" : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"}`}
//                 style={selectedCategory === category ? { backgroundColor: "#159A9C" } : {}}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredPosts.length > 0 ? (
//               filteredPosts.map((post) => (
//                 <div
//                   key={post._id}
//                   className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden relative flex flex-col cursor-pointer"
//                   onClick={() => setOpenedPost(post)}
//                 >
//                   <button
//                     onClick={(e) => { e.stopPropagation(); toggleSavePost(post); }}
//                     className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
//                   >
//                     {isSaved(post._id) ? <BookmarkCheck size={20} className="text-blue-500" /> : <Bookmark size={20} className="text-blue-500" />}
//                   </button>

//                   {post.image ? (
//                     <img
//                       src={post.image}
//                       alt={post.title || "Post Image"}
//                       style={{ width: '100%', height: '180px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
//                     />
//                   ) : (
//                     <div style={{ width: '100%', height: '180px', background: 'linear-gradient(to right, #cce5ff, #d5d5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>
//                       {post.title?.charAt(0)?.toUpperCase() || "P"}
//                     </div>
//                   )}

//                   <div className="p-4 flex flex-col flex-grow">
//                     {post.category && (
//                       <span className="inline-block mb-2 text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full self-start">
//                         {post.category}
//                       </span>
//                     )}

//                     <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
//                       {post.title}
//                     </h3>

//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {post.content.substring(0, 100)}...
//                     </p>

//                     <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
//                       <div className="flex items-center gap-2">
//                         {post.author?.avatar ? (
//                           <img
//                             src={post.author.avatar}
//                             alt="author"
//                             style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
//                           />
//                         ) : (
//                           <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-medium">
//                             {post.author?.name?.charAt(0)?.toUpperCase() || "A"}
//                           </div>
//                         )}
//                         <span>{post.author?.name || "Anonymous"}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock size={12} />
//                         <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
//                 <Users size={64} className="mx-auto text-blue-500" />
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Found</h2>
//                 <p className="text-gray-600">Try a different search or connect with others.</p>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Postt;



// import { useState, useEffect } from "react";
// import {
//   Bookmark,
//   BookmarkCheck,
//   Clock,
//   Eye,
//   Heart,
//   MessageCircle,
//   Share2,
//   Users,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Carousel from "../components/Carousel";
// import Select from "react-select";
// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import BookPost from "../components/BookPost";
// import RelatedTales from "../components/RelatedTales";

// const Postt = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState({});
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [showShare, setShowShare] = useState({});
//   const [openedPost, setOpenedPost] = useState(null);

//   const navigate = useNavigate();

//   const { data: posts = [] } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/posts");
//       return res.data;
//     },
//   });

//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/users/suggestions");
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     setSavedPosts(saved);
//   }, []);

//   const isSaved = (postId) => savedPosts.some((p) => p._id === postId);

//   const toggleSavePost = (post) => {
//     const existing = JSON.parse(localStorage.getItem("savedPosts")) || [];
//     const alreadySaved = existing.find((p) => p._id === post._id);
//     const updated = alreadySaved ? existing.filter((p) => p._id !== post._id) : [...existing, post];
//     localStorage.setItem("savedPosts", JSON.stringify(updated));
//     setSavedPosts(updated);
//   };

//   const handleSharePost = (postId) => {
//     const selectedOption = selectedUsers[postId];
//     if (!selectedOption) return;
//     const selectedUser = selectedOption.user;
//     const post = posts.find((p) => p._id === postId);

//     navigate("/messenger", {
//       state: { user: selectedUser, post, messageText: post.content },
//     });
//   };

//   const handleLike = (postId) => console.log("Liked post", postId);
//   const handleComment = (postId) => console.log("Commented on post", postId);

//   const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))];

//   const filteredPosts = posts.filter((post) => {
//     const q = searchQuery.toLowerCase();
//     const matchesSearch = post.title?.toLowerCase().includes(q) || post.category?.toLowerCase().includes(q) || post.content?.toLowerCase().includes(q);
//     const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const userOptions = users.map((user) => ({ value: user._id, label: user.name, user }));

//   return (
//     <div className="p-6 overflow-auto">
//       {openedPost && (
//         <div className="flex flex-col lg:flex-row gap-10">
//           <div className="flex-1">
//             <BookPost
//               post={openedPost}
//               isSaved={isSaved(openedPost._id)}
//               onToggleSave={toggleSavePost}
//               onShare={handleSharePost}
//               onLike={handleLike}
//               onComment={handleComment}
//             />
//           </div>
//           <div className="w-full lg:w-[340px]">
//             <RelatedTales posts={posts} currentPostId={openedPost._id} />
//           </div>
//         </div>
//       )}

//       {!openedPost && (
//         <>
//           {posts?.length > 0 && <div className="mb-8"><Carousel /></div>}
//           <div className="max-w-7xl mx-auto mt-28 mb-8 flex gap-2 flex-wrap justify-center">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${selectedCategory === category ? "text-white border-0 bg-[#159A9C]" : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"}`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredPosts.length > 0 ? (
//               filteredPosts.map((post) => (
//                 <div
//                   key={post._id}
//                   className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden relative flex flex-col cursor-pointer"
//                   onClick={() => setOpenedPost(post)}
//                 >
//                   <button
//                     onClick={(e) => { e.stopPropagation(); toggleSavePost(post); }}
//                     className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
//                   >
//                     {isSaved(post._id) ? <BookmarkCheck size={20} className="text-blue-500" /> : <Bookmark size={20} className="text-blue-500" />}
//                   </button>

//                   {post.image ? (
//                     <img
//                       src={post.image}
//                       alt={post.title || "Post Image"}
//                       style={{ width: '100%', height: '180px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
//                     />
//                   ) : (
//                     <div style={{ width: '100%', height: '180px', background: 'linear-gradient(to right, #cce5ff, #d5d5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>
//                       {post.title?.charAt(0)?.toUpperCase() || "P"}
//                     </div>
//                   )}

//                   <div className="p-4 flex flex-col flex-grow">
//                     {post.category && (
//                       <span className="inline-block mb-2 text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full self-start">
//                         {post.category}
//                       </span>
//                     )}
//                     <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {post.content.substring(0, 100)}...
//                     </p>
//                     <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
//                       <div className="flex items-center gap-2">
//                         {post.author?.avatar ? (
//                           <img
//                             src={post.author.avatar}
//                             alt="author"
//                             style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
//                           />
//                         ) : (
//                           <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-medium">
//                             {post.author?.name?.charAt(0)?.toUpperCase() || "A"}
//                           </div>
//                         )}
//                         <span>{post.author?.name || "Anonymous"}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock size={12} />
//                         <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
//                 <Users size={64} className="mx-auto text-blue-500" />
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Found</h2>
//                 <p className="text-gray-600">Try a different search or connect with others.</p>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Postt;


import { useState, useEffect } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import BookPost from "../components/BookPost";
import RelatedTales from "../components/RelatedTales";

const Postt = () => {
  const [selectedUsers, setSelectedUsers] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openedPost, setOpenedPost] = useState(null);

  const navigate = useNavigate();

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    setSavedPosts(saved);
  }, []);

  const isSaved = (postId) => savedPosts.some((p) => p._id === postId);

  const toggleSavePost = (post) => {
    const existing = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const updated = existing.find((p) => p._id === post._id)
      ? existing.filter((p) => p._id !== post._id)
      : [...existing, post];
    localStorage.setItem("savedPosts", JSON.stringify(updated));
    setSavedPosts(updated);
  };

  const handleSharePost = (postId) => {
    const selectedOption = selectedUsers[postId];
    if (!selectedOption) return;
    const selectedUser = selectedOption.user;
    const post = posts.find((p) => p._id === postId);
    navigate("/messenger", {
      state: { user: selectedUser, post, messageText: post.content },
    });
  };

  const categories = ["All", ...new Set(posts.map((p) => p.category).filter(Boolean))];
  const filteredPosts = posts.filter((p) =>
    selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <div className="p-6 overflow-auto">
      {openedPost ? (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <BookPost
              post={openedPost}
              isSaved={isSaved(openedPost._id)}
              onToggleSave={toggleSavePost}
              onShare={handleSharePost}
              onLike={() => {}}
              onComment={() => {}}
            />
          </div>
          <div className="w-full lg:w-[340px]">
            <RelatedTales posts={posts} currentPostId={openedPost._id} />
          </div>
        </div>
      ) : (
        <>
          {posts.length > 0 && <div className="mb-8"><Carousel /></div>}
          <div className="max-w-7xl mx-auto mt-28 mb-8 flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${selectedCategory === category ? "text-white border-0 bg-[#159A9C]" : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden relative flex flex-col cursor-pointer"
                  onClick={() => setOpenedPost(post)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSavePost(post);
                    }}
                    className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-blue-100 transition"
                  >
                    {isSaved(post._id) ? (
                      <BookmarkCheck size={20} className="text-blue-500" />
                    ) : (
                      <Bookmark size={20} className="text-blue-500" />
                    )}
                  </button>

                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title || "Post Image"}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '180px', background: 'linear-gradient(to right, #cce5ff, #d5d5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>
                      {post.title?.charAt(0)?.toUpperCase() || "P"}
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-grow">
                    {post.category && (
                      <span className="inline-block mb-2 text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full self-start">
                        {post.category}
                      </span>
                    )}
                    <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.content.substring(0, 100)}...
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        {post.author?.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt="author"
                            style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-medium">
                            {post.author?.name?.charAt(0)?.toUpperCase() || "A"}
                          </div>
                        )}
                        <span>{post.author?.name || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
                <Users size={64} className="mx-auto text-blue-500" />
                <h2 className="text-2xl font-bold mb-4 text-gray-800">No Posts Found</h2>
                <p className="text-gray-600">Try a different search or connect with others.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Postt;
