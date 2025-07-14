// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../../lib/axios";
// import { Loader } from "lucide-react";
// import { useState } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Pie } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const {
//     data: messages = [],
//     isLoading: loadingMessages,
//     isError: errorMessages,
//     error,
//   } = useQuery({
//     queryKey: ["contactMessages"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("connections/list");
//       return res.data;
//     },
//   });

//   const {
//     data: users = [],
//     isLoading: loadingUsers,
//     isError: errorUsers,
//   } = useQuery({
//     queryKey: ["allUsers"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/auth/userlist");
//       return res.data;
//     },
//   });

//   if (loadingMessages || loadingUsers) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader className="size-8 animate-spin text-gray-600" />
//       </div>
//     );
//   }

//   if (errorMessages || errorUsers) {
//     return (
//       <div className="text-center text-red-600 mt-10">
//         Error loading data: {error?.message || "Something went wrong"}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 hidden md:flex flex-col p-6">
//         <h1 className="text-2xl font-bold text-[#159A9C] mb-10">Admin Panel</h1>
//         <nav className="flex flex-col space-y-4 text-gray-700">
//           <button
//             onClick={() => setActiveTab("dashboard")}
//             className={`text-left font-medium hover:text-[#159A9C] ${
//               activeTab === "dashboard" ? "text-[#159A9C]" : ""
//             }`}
//           >
//             Dashboard
//           </button>
//           <button
//             onClick={() => setActiveTab("users")}
//             className={`text-left font-medium hover:text-[#159A9C] ${
//               activeTab === "users" ? "text-[#159A9C]" : ""
//             }`}
//           >
//             Users
//           </button>
//           <button
//             onClick={() => setActiveTab("messages")}
//             className={`text-left font-medium hover:text-[#159A9C] ${
//               activeTab === "messages" ? "text-[#159A9C]" : ""
//             }`}
//           >
//             Messages
//           </button>
//           <a
//             href="/login"
//             className="font-medium text-red-500 hover:underline mt-auto"
//           >
//             Logout
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <header
//           className="bg-white shadow px-6 py-6 flex justify-between items-center"
//           style={{ minHeight: "70px" }}
//         >
//           <h2 className="text-xl font-semibold text-[#159A9C] capitalize">
//             {activeTab}
//           </h2>
//           <span className="text-gray-600 hidden sm:block">Welcome, Binita Acharya</span>
//         </header>

//         <main className="p-6 overflow-y-auto">
//           {/* Dashboard Tab */}
//           {activeTab === "dashboard" && (
//             <div>
//               <h3 className="text-2xl font-bold text-[#159A9C] mb-6">Overview</h3>

//               {/* Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
//                 <div className="bg-white shadow-md border-l-8 border-[#159A9C] rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition">
//                   <div className="bg-[#159A9C]/10 text-[#159A9C] rounded-full p-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5.121 17.804A4 4 0 0110 15h4a4 4 0 014.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm text-[#159A9C] font-medium">Total Users</p>
//                     <p className="text-3xl font-bold  text-gray-500 ">{users.length}</p>
//                   </div>
//                 </div>

//                 <div className="bg-white shadow-md border-l-8 border-[#FF7F50] rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition">
//                   <div className="bg-[#FF7F50]/10 text-[#FF7F50] rounded-full p-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2
//                         2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500  font-medium">Contact Messages</p>
//                     <p className="text-3xl font-bold text-[#FF7F50]">{messages.length}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Pie Charts */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
//                   <h4 className="text-lg font-semibold text-[#159A9C] mb-4">User Distribution</h4>
//                   <div className="w-40 h-40">
//                     <Pie
//                       data={{
//                         labels: ["Users", "Others"],
//                         datasets: [
//                           {
//                             data: [users.length, Math.max(100 - users.length, 0)],
//                             backgroundColor: [ "#E5E7EB", "#159A9C"],
//                             borderWidth: 1,
//                           },
//                         ],
//                       }}
//                       options={{
//                         responsive: true,
//                         maintainAspectRatio: false,
//                         plugins: {
//                           legend: {
//                             display: true,
//                             position: "bottom",
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
//                   <h4 className="text-lg font-semibold text-[#FF7F50] mb-4">Contact Messages</h4>
//                   <div className="w-40 h-40">
//                     <Pie
//                       data={{
//                         labels: ["Messages", "Others"],
//                         datasets: [
//                           {
//                             data: [messages.length, Math.max(100 - messages.length, 0)],
//                             backgroundColor: [ "#F3F4F6", "#FF7F50"],
//                             borderWidth: 1,
//                           },
//                         ],
//                       }}
//                       options={{
//                         responsive: true,
//                         maintainAspectRatio: false,
//                         plugins: {
//                           legend: {
//                             display: true,
//                             position: "bottom",
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//       {/* Users Tab */}
// {activeTab === "users" && (
//   <div>
//     <h3 className="text-2xl font-bold text-[#159A9C] mb-6">All Users</h3>
//     <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-[#159A9C] text-white text-left">
//             <th className="py-2 px-4 font-semibold">Name</th>
//             <th className="py-2 px-4 font-semibold">Username</th>
//             <th className="py-2 px-4 font-semibold">Email</th>
//             <th className="py-2 px-4 font-semibold">Role</th>
//             <th className="py-2 px-4 font-semibold">Location</th>
//             <th className="py-2 px-4 font-semibold">Skills</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={index} className="border-t">
//               <td className="py-2 px-4">{user.name || "N/A"}</td>
//               <td className="py-2 px-4">{user.username || "N/A"}</td>
//               <td className="py-2 px-4">{user.email}</td>
//               <td className="py-2 px-4">{user.role === "1" ? "Admin" : "User"}</td>
//               <td className="py-2 px-4">{user.location || "N/A"}</td>
//               <td className="py-2 px-4">{user.skills || "N/A"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// )}

// {/* Messages Tab */}
// {activeTab === "messages" && (
//   <div>
//     <h3 className="text-2xl font-bold text-[#159A9C] mb-6">Contact Messages</h3>
//     <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-[#159A9C] text-white text-left">
//             <th className="py-2 px-4 font-semibold">Name</th>
//             <th className="py-2 px-4 font-semibold">Email</th>
//             <th className="py-2 px-4 font-semibold">Message</th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((msg, index) => (
//             <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-50"}>
//               <td className="py-2 px-4">{msg.name}</td>
//               <td className="py-2 px-4">{msg.email}</td>
//               <td className="py-2 px-4">{msg.message}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// )}

//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const {
    data: messages = [],
    isLoading: loadingMessages,
    isError: errorMessages,
    error,
  } = useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      const res = await axiosInstance.get("connections/list");
      return res.data;
    },
  });

  const {
    data: users = [],
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/userlist");
      return res.data;
    },
  });

  const onDeleteUser = (userId) => {
    console.log("Delete user with ID:", userId);
    // TODO: Implement delete API call here
  };

  const onDeleteMessage = (messageId) => {
    console.log("Delete message with ID:", messageId);
    // TODO: Implement delete API call here
  };

  if (loadingMessages || loadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (errorMessages || errorUsers) {
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading data: {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 hidden md:flex flex-col p-6">
        <h1 className="text-2xl font-bold text-[#159A9C] mb-10">Admin Panel</h1>
        <nav className="flex flex-col space-y-4 text-gray-700">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`text-left font-medium hover:text-[#159A9C] ${
              activeTab === "dashboard" ? "text-[#159A9C]" : ""
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`text-left font-medium hover:text-[#159A9C] ${
              activeTab === "users" ? "text-[#159A9C]" : ""
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`text-left font-medium hover:text-[#159A9C] ${
              activeTab === "messages" ? "text-[#159A9C]" : ""
            }`}
          >
            Messages
          </button>
          <a
            href="/login"
            className="font-medium text-red-500 hover:underline mt-auto"
          >
            Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#159A9C] capitalize">
            {activeTab}
          </h2>
          <span className="text-gray-600 hidden sm:block">Welcome, Binita Acharya</span>
        </header>

        <main className="p-6 overflow-y-auto">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div>
              <h3 className="text-2xl font-bold text-[#159A9C] mb-6">Overview</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white shadow-md border-l-8 border-[#159A9C] rounded-xl p-6 flex items-center gap-4">
                  <div className="bg-[#159A9C]/10 text-[#159A9C] rounded-full p-3">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M5.121 17.804A4 4 0 0110 15h4a4 4 0 014.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#159A9C] font-medium">Total Users</p>
                    <p className="text-3xl font-bold text-gray-500">{users.length}</p>
                  </div>
                </div>

                <div className="bg-white shadow-md border-l-8 border-[#FF7F50] rounded-xl p-6 flex items-center gap-4">
                  <div className="bg-[#FF7F50]/10 text-[#FF7F50] rounded-full p-3">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Contact Messages</p>
                    <p className="text-3xl font-bold text-[#FF7F50]">{messages.length}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                  <h4 className="text-lg font-semibold text-[#159A9C] mb-4">User Distribution</h4>
                  <div className="w-40 h-40">
                    <Pie data={{
                      labels: ["Users", "Others"],
                      datasets: [{
                        data: [users.length, Math.max(100 - users.length, 0)],
                        backgroundColor: ["#E5E7EB", "#159A9C"],
                        borderWidth: 1,
                      }],
                    }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: true, position: "bottom" } }
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                  <h4 className="text-lg font-semibold text-[#FF7F50] mb-4">Contact Messages</h4>
                  <div className="w-40 h-40">
                    <Pie data={{
                      labels: ["Messages", "Others"],
                      datasets: [{
                        data: [messages.length, Math.max(100 - messages.length, 0)],
                        backgroundColor: ["#F3F4F6", "#FF7F50"],
                        borderWidth: 1,
                      }],
                    }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: true, position: "bottom" } }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <h3 className="text-2xl font-bold text-[#159A9C] mb-6">All Users</h3>
              <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#159A9C] text-white text-left">
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Username</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4">Role</th>
                      <th className="py-2 px-4">Location</th>
                      <th className="py-2 px-4">Skills</th>
                      <th className="py-2 px-4">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={i} className="border-t">
                        <td className="py-2 px-4">{user.name || "N/A"}</td>
                        <td className="py-2 px-4">{user.username}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">{user.role === "1" ? "Admin" : "User"}</td>
                        <td className="py-2 px-4">{user.location || "N/A"}</td>
                        <td className="py-2 px-4">{user.skills || "N/A"}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => onDeleteUser(user._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div>
              <h3 className="text-2xl font-bold text-[#159A9C] mb-6">Contact Messages</h3>
              <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#159A9C] text-white text-left">
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4">Message</th>
                      <th className="py-2 px-4">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, i) => (
                      <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                        <td className="py-2 px-4">{msg.name}</td>
                        <td className="py-2 px-4">{msg.email}</td>
                        <td className="py-2 px-4">{msg.message}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => onDeleteMessage(msg._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
