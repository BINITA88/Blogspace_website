// import { useState, useRef, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Bell,
//   Home,
//   User,
//   Users,
//   Search,
// } from "lucide-react";
// import { MdArticle } from "react-icons/md";
// import { AiTwotoneMessage } from "react-icons/ai";
// import { axiosInstance } from "../../lib/axios";
// import logo from "../../assets/imgg/logo.png";

// const Navbar = () => {
//   const { data: authUser } = useQuery({ queryKey: ["authUser"] });
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const searchBoxRef = useRef(null);
//   const dropdownRef = useRef(null);

//   const { data: posts = [] } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/posts");
//       return res.data;
//     },
//   });

//   const { data: notifications } = useQuery({
//     queryKey: ["notifications"],
//     queryFn: async () => axiosInstance.get("/notifications"),
//     enabled: !!authUser,
//   });

//   const { data: connectionRequests } = useQuery({
//     queryKey: ["connectionRequests"],
//     queryFn: async () => axiosInstance.get("/connections/requests"),
//     enabled: !!authUser,
//   });

//   const unreadNotificationCount = notifications?.data.filter((n) => !n.read).length;
//   const unreadConnectionRequestsCount = connectionRequests?.data?.length;

//   const { mutate: logout } = useMutation({
//     mutationFn: () => axiosInstance.post("/auth/logout"),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },
//   });

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !searchBoxRef.current.contains(event.target)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [dropdownOpen]);

//   const filteredPosts = searchQuery
//     ? posts.filter((post) =>
//         post?.title?.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="relative">
//       <nav className="bg-secondary shadow-md sticky top-0 z-20">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <Link to="/">
//               <img className="h-16 rounded" src={logo} alt="Logo" />
//             </Link>
//             <div ref={searchBoxRef} className="relative w-64 md:w-80">
//               <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
//                 <Search className="text-gray-400 mr-2" size={15} />
//                 <input
//                   type="text"
//                   placeholder="Search posts..."
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value);
//                     setDropdownOpen(true);
//                   }}
//                   className="outline-none w-full text-gray-700"
//                 />
//               </div>
//               {dropdownOpen && searchQuery && (
//                 <div
//                   ref={dropdownRef}
//                   className="absolute left-0 top-full mt-2 w-full bg-white border rounded shadow z-30 max-h-60 overflow-y-auto"
//                 >
//                   {filteredPosts.length > 0 ? (
//                     filteredPosts.slice(0, 6).map((post) => (
//                       <button
//                         key={post._id}
//                         onClick={() => {
//                           setSearchQuery("");
//                           setDropdownOpen(false);
//                           navigate(`/post/${post._id}`);
//                         }}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
//                       >
//                         {post.title || "Untitled Post"}
//                       </button>
//                     ))
//                   ) : (
//                     <div className="px-4 py-2 text-sm text-gray-500">No posts found</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center gap-4 md:gap-6">
//             {authUser ? (
//               <>
//                 <Link to="/postt" className="text-neutral flex flex-col items-center">
//                   <Home size={20} />
//                   <span className="text-xs hidden md:block">Home</span>
//                 </Link>
//                 <Link to="/" className="text-neutral flex flex-col items-center">
//                   <MdArticle size={20} />
//                   <span className="text-xs hidden md:block">Blogs</span>
//                 </Link>
//                 <Link to="/messenger" className="text-neutral flex flex-col items-center">
//                   <AiTwotoneMessage size={24} />
//                   <span className="text-xs hidden md:block">Message</span>
//                 </Link>
//                 <Link to="/network" className="text-neutral flex flex-col items-center relative">
//                   <Users size={20} />
//                   <span className="text-xs hidden md:block">Network</span>
//                   {unreadConnectionRequestsCount > 0 && (
//                     <span className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
//                       {unreadConnectionRequestsCount}
//                     </span>
//                   )}
//                 </Link>
//                 <Link to="/notifications" className="text-neutral flex flex-col items-center relative">
//                   <Bell size={20} />
//                   <span className="text-xs hidden md:block">Notifications</span>
//                   {unreadNotificationCount > 0 && (
//                     <span className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
//                       {unreadNotificationCount}
//                     </span>
//                   )}
//                 </Link>
//                 <div className="relative">
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="text-neutral flex flex-col items-center"
//                   >
//                     <User size={20} />
//                     <span className="text-xs hidden md:block">Me</span>
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="btn btn-ghost">Sign In</Link>
//                 <Link to="/signup" className="btn btn-primary">Join now</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  LogOut,
  User,
  Users,
  Search,
} from "lucide-react";
import { MdArticle } from "react-icons/md";
import { AiTwotoneMessage } from "react-icons/ai";
import { axiosInstance } from "../../lib/axios";
import logo from "../../assets/imgg/logo.png";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
      setDropdownOpen(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="bg-secondary shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo + Search Group */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img className="h-20 w-35 rounded" src={logo} alt="Logo" />
            </Link>

            {/* Search Bar */}
            <div className="relative w-64 md:w-80">
              <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
                <Search className="text-gray-400 mr-2" size={15} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none w-full text-gray-700"
                />
              </div>
              {searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-50 max-h-60 overflow-y-auto">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.slice(0, 6).map((post) => (
                      <button
                        key={post._id}
                        onClick={() => {
                          setSearchQuery("");
                          navigate(`/post/${post._id}`);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        {post.title}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No posts found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <Link to="/postt" className="text-neutral flex flex-col items-center">
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>

                <Link to="/" className="text-neutral flex flex-col items-center">
                  <MdArticle size={20} />
                  <span className="text-xs hidden md:block">Blogs</span>
                </Link>

                <Link to="/messenger" className="text-neutral flex flex-col items-center">
                  <AiTwotoneMessage size={24} />
                  <span className="text-xs hidden md:block">Message</span>
                </Link>

                <Link to="/network" className="text-neutral flex flex-col items-center relative">
                  <Users size={20} />
                  <span className="text-xs hidden md:block">My Network</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center">
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>

                <Link to="/notifications" className="text-neutral flex flex-col items-center relative">
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-neutral flex flex-col items-center focus:outline-none"
                  >
                    <User size={20} />
                    <span className="text-xs hidden md:block">Me</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                      <Link
                        to={`/profile/${authUser.username}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
