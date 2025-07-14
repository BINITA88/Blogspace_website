

// import { useState, useRef, useEffect } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Bell,
//   Home,
//   LogOut,
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
//   const dropdownRef = useRef();

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

//   const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
//   const unreadConnectionRequestsCount = connectionRequests?.data?.length;

//   const { mutate: logout } = useMutation({
//     mutationFn: () => axiosInstance.post("/auth/logout"),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },
//   });

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to logout?");
//     if (confirmed) {
//       logout();
//       setDropdownOpen(false);
//     }
//   };

//   const filteredPosts = posts.filter((post) =>
//     post.title?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Static user search
//   const staticUsers = [
//     {
//       _id: "u1",
//       name: "Binita Acharya",
//       email: "binita.acharya@gmail.com"
//     }
//   ];

//   const filteredUsers = staticUsers.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <nav className="bg-secondary shadow-md sticky top-0 z-10">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center py-3">
//           {/* Logo + Search Group */}
//           <div className="flex items-center gap-4">
//             <Link to="/">
//               <img className="h-20 w-35 rounded" src={logo} alt="Logo" />
//             </Link>

//             {/* Search Bar */}
//             <div className="relative w-64 md:w-80">
//               <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
//                 <Search className="text-gray-400 mr-2" size={15} />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="outline-none w-full text-gray-700"
//                 />
//               </div>

//               {searchQuery && (
//                 <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-50 max-h-60 overflow-y-auto text-sm">

//                   {/* Users Section */}
//                   {filteredUsers.length > 0 && (
//                     <div>
//                       <div className="px-4 py-2 font-semibold text-gray-600 text-xs border-b">Users</div>
//                       {filteredUsers.map((user) => (
//                         <div
//                           key={user._id}
//                           className="px-4 py-2 hover:bg-gray-100"
//                         >
//                           <div className="flex flex-col">
//                             <span>{user.name}</span>
//                             <span className="text-gray-500 text-xs">{user.email}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Posts Section */}
//                   {filteredPosts.length > 0 && (
//                     <div>
//                       <div className="px-4 py-2 font-semibold text-gray-600 text-xs border-b">Posts</div>
//                       {filteredPosts.slice(0, 6).map((post) => (
//                         <button
//                           key={post._id}
//                           onClick={() => {
//                             setSearchQuery("");
//                             navigate(`/post/${post._id}`);
//                           }}
//                           className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                           {post.title}
//                         </button>
//                       ))}
//                     </div>
//                   )}

//                   {filteredUsers.length === 0 && filteredPosts.length === 0 && (
//                     <div className="px-4 py-2 text-gray-500">No results found</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side Icons */}
//           <div className="flex items-center gap-2 md:gap-6">
//             {authUser ? (
//               <>
//                 <Link to="/" className="text-neutral flex flex-col items-center">
//                   <Home size={20} />
//                   <span className="text-xs hidden md:block">Home</span>
//                 </Link>

//                 <Link to="/postt" className="text-neutral flex flex-col items-center">
//                   <MdArticle size={20} />
//                   <span className="text-xs hidden md:block">Blogs</span>
//                 </Link>

//                 <Link to="/messenger" className="text-neutral flex flex-col items-center">
//                   <AiTwotoneMessage size={24} />
//                   <span className="text-xs hidden md:block">Message</span>
//                 </Link>

//                 <Link to="/network" className="text-neutral flex flex-col items-center relative">
//                   <Users size={20} />
//                   <span className="text-xs hidden md:block">My Network</span>
//                   {unreadConnectionRequestsCount > 0 && (
//                     <span
//                       className="absolute -top-1 -right-1 md:right-4 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center"
//                       style={{ backgroundColor: '#159A9C' }}
//                     >
//                       {unreadConnectionRequestsCount}
//                     </span>
//                   )}
//                 </Link>

//                 <Link to="/notifications" className="text-neutral flex flex-col items-center relative">
//                   <Bell size={20} />
//                   <span className="text-xs hidden md:block">Notifications</span>
//                   {unreadNotificationCount > 0 && (
//                     <span
//                       className="absolute -top-1 -right-1 md:right-4 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center"
//                       style={{ backgroundColor: '#159A9C' }}
//                     >
//                       {unreadNotificationCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* Profile Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="text-neutral flex flex-col items-center focus:outline-none"
//                   >
//                     <User size={20} />
//                     <span className="text-xs hidden md:block">Me</span>
//                   </button>
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
//                       <Link
//                         to={`/profile/${authUser.username}`}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         View Profile
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//               <Link
//   to="/login"
//   className="btn btn-ghost text-[#159A9C] hover:text-[#128a8c]"
// >
//   Sign In
// </Link>

// <Link
//   to="/signup"
//   className="btn bg-[#159A9C] hover:bg-[#128a8c] text-white border-none"
// >
//   Join now
// </Link>

//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
const [showConfirm, setShowConfirm] = useState(false); // add this near top with other useStates

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
  setShowConfirm(true); // open modal instead of browser confirm
};

const confirmLogout = () => {
  logout();
  setDropdownOpen(false);
  setShowConfirm(false);
};

const cancelLogout = () => {
  setShowConfirm(false);
};


  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const staticUsers = [
    {
      _id: "u1",
      name: "Binita Acharya",
      email: "binita.acharya@gmail.com"
    }
  ];

  const filteredUsers = staticUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              {/* <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
                <Search className="text-gray-400 mr-2" size={15} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none w-full text-gray-700"
                />
              </div> */}

              {searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-50 max-h-60 overflow-y-auto text-sm">
                  {/* Users Section */}
                  {filteredUsers.length > 0 && (
                    <div>
                      <div className="px-4 py-2 font-semibold text-gray-600 text-xs border-b">Users</div>
                      {filteredUsers.map((user) => (
                        <div key={user._id} className="px-4 py-2 hover:bg-gray-100">
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-gray-500 text-xs">{user.email}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Posts Section */}
                  {filteredPosts.length > 0 && (
                    <div>
                      <div className="px-4 py-2 font-semibold text-gray-600 text-xs border-b">Posts</div>
                      {filteredPosts.slice(0, 6).map((post) => (
                        <button
                          key={post._id}
                          onClick={() => {
                            setSearchQuery("");
                            navigate(`/post/${post._id}`);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {post.title}
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                    <div className="px-4 py-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <Link
                  to="/"
                  className={`flex flex-col items-center ${isActive("/") ? "text-[#159A9C] font-semibold" : "text-neutral"}`}
                >
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>

                <Link
                  to="/postt"
                  className={`flex flex-col items-center ${isActive("/postt") ? "text-[#159A9C] font-semibold" : "text-neutral"}`}
                >
                  <MdArticle size={20} />
                  <span className="text-xs hidden md:block">Blogs</span>
                </Link>

                <Link
                  to="/messenger"
                  className={`flex flex-col items-center ${isActive("/messenger") ? "text-[#159A9C] font-semibold" : "text-neutral"}`}
                >
                  <AiTwotoneMessage size={24} />
                  <span className="text-xs hidden md:block">Message</span>
                </Link>

                <Link
                  to="/network"
                  className={`relative flex flex-col items-center ${isActive("/network") ? "text-[#159A9C] font-semibold" : "text-neutral"}`}
                >
                  {/* <Link to="/summarize" className="hover:underline">
                    Summarize & Feed
                  </Link> */}
                  <Users size={20} />
                  <span className="text-xs hidden md:block">My Network</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center bg-[#159A9C]">
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/notifications"
                  className={`relative flex flex-col items-center ${isActive("/notifications") ? "text-[#159A9C] font-semibold" : "text-neutral"}`}
                >
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center bg-[#159A9C]">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex flex-col items-center focus:outline-none text-neutral"
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
                <Link
                  to="/login"
                  className="btn btn-ghost text-[#159A9C] hover:text-[#128a8c]"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="btn bg-[#159A9C] hover:bg-[#128a8c] text-white border-none"
                >
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

    {showConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-[#2A8B8E] text-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
      <p className="mb-4 font-semibold text-lg">
        Are you sure you want to logout?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmLogout}
          className="bg-white text-[#2A8B8E] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Yes, Logout
        </button>
        <button
          onClick={cancelLogout}
          className="bg-white text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* assasa */}
    </nav>
  );
};

export default Navbar;
