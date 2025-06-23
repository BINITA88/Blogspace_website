import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus, Users, Sparkles } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
	const { data: user } = useQuery({ queryKey: ["authUser"] });

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: () => axiosInstance.get("/connections/requests"),
	});

	const { data: connections } = useQuery({
		queryKey: ["connections"],
		queryFn: () => axiosInstance.get("/connections"),
	});

	return (
		<div className="min-h-screen  ml-80  flex mt-14 justify-center">
			<div className="w-full max-w-20xl grid grid-cols-1 lg:grid-cols-4 gap-8">
				{/* Sidebar (optional) */}
				{/* <div className="col-span-1">
					<Sidebar user={user} />
				</div> */}

				<div className="col-span-1 lg:col-span-3">
					<div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
						<div className="flex items-center space-x-3 mb-6">
							<Users className="text-indigo-500 w-6 h-6" />
							<h1 className="text-3xl font-bold text-gray-800 tracking-tight">
								My Network
							</h1>
						</div>

						{connectionRequests?.data?.length > 0 ? (
							<div className="mb-10">
								<div className="flex items-center space-x-2 mb-4">
									<Sparkles className="text-yellow-400 w-5 h-5" />
									<h2 className="text-2xl font-semibold text-gray-700">
										Connection Requests
									</h2>
								</div>
								<div className="space-y-4">
									{connectionRequests.data.map((request) => (
										<FriendRequest key={request.id} request={request} />
									))}
								</div>
							</div>
						) : (
							<div className="bg-gradient-to-br from-white to-slate-100 rounded-xl border border-gray-200 p-8 text-center shadow-sm mb-10">
								<UserPlus size={50} className="mx-auto text-gray-400 mb-4" />
								<h3 className="text-2xl font-semibold text-gray-700 mb-2">
									No Connection Requests
								</h3>
								<p className="text-gray-600">
									You don&apos;t have any pending connection requests.
								</p>
								<p className="text-gray-600 mt-2">
									Explore suggested connections below to expand your network!
								</p>
							</div>
						)}

						{connections?.data?.length > 0 && (
							<div>
								<div className="flex items-center space-x-2 mb-5">
									<Users className="text-green-500 w-5 h-5" />
									<h2 className="text-2xl font-semibold text-gray-700">
										My Connections
									</h2>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{connections.data.map((connection) => (
										<UserCard
											key={connection._id}
											user={connection}
											isConnection={true}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NetworkPage;


// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import { UserPlus, Users, Network, Sparkles, Search, Filter, Bell, Settings } from "lucide-react";
// import FriendRequest from "../components/FriendRequest";
// import UserCard from "../components/UserCard";

// const NetworkPage = () => {
// 	const { data: user } = useQuery({ queryKey: ["authUser"] });

// 	const { data: connectionRequests } = useQuery({
// 		queryKey: ["connectionRequests"],
// 		queryFn: () => axiosInstance.get("/connections/requests"),
// 	});

// 	const { data: connections } = useQuery({
// 		queryKey: ["connections"],
// 		queryFn: () => axiosInstance.get("/connections"),
// 	});

// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
		

// 			<div className="max-w-7xl  mx-auto px-6 py-8">
// 				{/* Stats Overview */}
// 				{/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// 					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
// 						<div className="flex items-center justify-between">
// 							<div>
// 								<p className="text-sm font-medium text-gray-600">Total Connections</p>
// 								<p className="text-3xl font-bold text-blue-600">{connections?.data?.length || 0}</p>
// 							</div>
// 							<div className="p-3 bg-blue-100 rounded-xl">
// 								<Users className="w-6 h-6 text-blue-600" />
// 							</div>
// 						</div>
// 					</div>
// 					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
// 						<div className="flex items-center justify-between">
// 							<div>
// 								<p className="text-sm font-medium text-gray-600">Pending Requests</p>
// 								<p className="text-3xl font-bold text-orange-600">{connectionRequests?.data?.length || 0}</p>
// 							</div>
// 							<div className="p-3 bg-orange-100 rounded-xl">
// 								<UserPlus className="w-6 h-6 text-orange-600" />
// 							</div>
// 						</div>
// 					</div>
// 					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
// 						<div className="flex items-center justify-between">
// 							<div>
// 								<p className="text-sm font-medium text-gray-600">This Week</p>
// 								<p className="text-3xl font-bold text-green-600">+12</p>
// 							</div>
// 							<div className="p-3 bg-green-100 rounded-xl">
// 								<Sparkles className="w-6 h-6 text-green-600" />
// 							</div>
// 						</div>
// 					</div>
// 					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
// 						<div className="flex items-center justify-between">
// 							<div>
// 								<p className="text-sm font-medium text-gray-600">Network Score</p>
// 								<p className="text-3xl font-bold text-purple-600">8.5</p>
// 							</div>
// 							<div className="p-3 bg-purple-100 rounded-xl">
// 								<Network className="w-6 h-6 text-purple-600" />
// 							</div>
// 						</div>
// 					</div>
// 				</div> */}

// 				{/* Connection Requests Section */}
// 				{connectionRequests?.data?.length > 0 ? (
// 					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// 						<div className="flex items-center justify-between mb-6">
// 							<div className="flex items-center space-x-3">
// 								<div className="p-2 bg-orange-100 rounded-xl">
// 									<UserPlus className="w-6 h-6 text-orange-600" />
// 								</div>
// 								<div>
// 									<h2 className="text-xl font-bold text-gray-900">Connection Requests</h2>
// 									<p className="text-sm text-gray-600">Review and respond to pending requests</p>
// 								</div>
// 								<span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
// 									{connectionRequests.data.length} new
// 								</span>
// 							</div>
// 							<button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
// 								View All
// 							</button>
// 						</div>
// 						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// 							{connectionRequests.data.map((request) => (
// 								<div key={request.id} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-sm transition-all duration-200">
// 									<FriendRequest request={request} />
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				) : (
// 					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// 						<div className="text-center py-12">
// 							<div className="relative mb-6">
// 								<div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl w-28 h-28 mx-auto flex items-center justify-center">
// 									<UserPlus size={48} className="text-blue-600" />
// 								</div>
// 								<div className="absolute -top-2 -right-2 p-2 bg-yellow-100 rounded-full">
// 									<Sparkles className="w-5 h-5 text-yellow-600" />
// 								</div>
// 							</div>
// 							<h3 className="text-2xl font-bold text-gray-900 mb-3">No Pending Requests</h3>
// 							<p className="text-gray-600 mb-6 max-w-md mx-auto text-lg">
// 								All caught up! You don't have any pending connection requests at the moment.
// 							</p>
// 							<div className="flex items-center justify-center space-x-4">
// 								<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
// 									Find People
// 								</button>
// 								<button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
// 									Import Contacts
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				)}

// 				{/* My Connections Section */}
// 				{connections?.data?.length > 0 && (
// 					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
// 						<div className="flex items-center justify-between mb-6">
// 							<div className="flex items-center space-x-3">
// 								<div className="p-2 bg-green-100 rounded-xl">
// 									<Users className="w-6 h-6 text-green-600" />
// 								</div>
// 								<div>
// 									<h2 className="text-xl font-bold text-gray-900">My Connections</h2>
// 									<p className="text-sm text-gray-600">Your professional network</p>
// 								</div>
// 								<span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
// 									{connections.data.length} connected
// 								</span>
// 							</div>
// 							<div className="flex items-center space-x-3">
// 								<button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
// 									<Filter className="w-4 h-4 text-gray-600" />
// 									<span className="text-sm font-medium text-gray-700">Filter</span>
// 								</button>
// 								<select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
// 									<option>Recent</option>
// 									<option>Alphabetical</option>
// 									<option>Most Active</option>
// 								</select>
// 							</div>
// 						</div>
// 						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// 							{connections.data.map((connection) => (
// 								<div key={connection._id} className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
// 									<UserCard user={connection} isConnection={true} />
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				)}

// 				{/* Suggested Connections Section */}
// 				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
// 					<div className="flex items-center justify-between mb-6">
// 						<div className="flex items-center space-x-3">
// 							<div className="p-2 bg-purple-100 rounded-xl">
// 								<Sparkles className="w-6 h-6 text-purple-600" />
// 							</div>
// 							<div>
// 								<h2 className="text-xl font-bold text-gray-900">People You May Know</h2>
// 								<p className="text-sm text-gray-600">Expand your professional network</p>
// 							</div>
// 						</div>
// 						<button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
// 							See All
// 						</button>
// 					</div>
// 					<div className="text-center py-16">
// 						<div className="p-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl w-32 h-32 mx-auto flex items-center justify-center mb-6">
// 							<Network className="w-12 h-12 text-purple-600" />
// 						</div>
// 						<h3 className="text-2xl font-bold text-gray-900 mb-3">Discover New Connections</h3>
// 						<p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
// 							We'll suggest people you might know based on your profile, interests, and mutual connections.
// 						</p>
// 						<div className="flex items-center justify-center space-x-4">
// 							<button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
// 								Explore Suggestions
// 							</button>
// 							<button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
// 								Sync Contacts
// 							</button>
// 						</div>
// 					</div>
// 				</div>

// 			</div>
// 		</div>
// 	);
// };

// export default NetworkPage;