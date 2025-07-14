// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import { toast } from "react-hot-toast";
// import { ExternalLink, Eye, MessageSquare, ThumbsUp, Trash2, UserPlus } from "lucide-react";
// import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { formatDistanceToNow } from "date-fns";

// const NotificationsPage = () => {
// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

// 	const queryClient = useQueryClient();

// 	const { data: notifications, isLoading } = useQuery({
// 		queryKey: ["notifications"],
// 		queryFn: () => axiosInstance.get("/notifications"),
// 	});

// 	const { mutate: markAsReadMutation } = useMutation({
// 		mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(["notifications"]);
// 		},
// 	});

// 	const { mutate: deleteNotificationMutation } = useMutation({
// 		mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(["notifications"]);
// 			toast.success("Notification deleted");
// 		},
// 	});

// 	const renderNotificationIcon = (type) => {
// 		switch (type) {
// 			case "like":
// 				return <ThumbsUp className='text-blue-500' />;

// 			case "comment":
// 				return <MessageSquare className='text-green-500' />;
// 			case "connectionAccepted":
// 				return <UserPlus className='text-purple-500' />;
// 			default:
// 				return null;
// 		}
// 	};

// 	const renderNotificationContent = (notification) => {
// 		switch (notification.type) {
// 			case "like":
// 				return (
// 					<span>
// 						<strong>{notification.relatedUser.name}</strong> liked your post
// 					</span>
// 				);
// 			case "comment":
// 				return (
// 					<span>
// 						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
// 							{notification.relatedUser.name}
// 						</Link>{" "}
// 						commented on your post
// 					</span>
// 				);
// 			case "connectionAccepted":
// 				return (
// 					<span>
// 						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
// 							{notification.relatedUser.name}
// 						</Link>{" "}
// 						accepted your connection request
// 					</span>
// 				);
// 			default:
// 				return null;
// 		}
// 	};

// 	const renderRelatedPost = (relatedPost) => {
// 		if (!relatedPost) return null;

// 		return (
// 			<Link
// 				to={`/post/${relatedPost._id}`}
// 				className='mt-2 p-2 bg-gray-50 rounded-md flex items-center space-x-2 hover:bg-gray-100 transition-colors'
// 			>
// 				{relatedPost.image && (
// 					<img src={relatedPost.image} alt='Post preview' className='w-10 h-10 object-cover rounded' />
// 				)}
// 				<div className='flex-1 overflow-hidden'>
// 					<p className='text-sm text-gray-600 truncate'>{relatedPost.content}</p>
// 				</div>
// 				<ExternalLink size={14} className='text-gray-400' />
// 			</Link>
// 		);
// 	};

// 	return (
// 		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
// 			<div className='col-span-1 lg:col-span-1'>
// 				<Sidebar user={authUser} />
// 			</div>
// 			<div className='col-span-1 lg:col-span-3'>
// 				<div className='bg-white rounded-lg shadow p-6'>
// 					<h1 className='text-2xl font-bold mb-6'>Notifications</h1>

// 					{isLoading ? (
// 						<p>Loading notifications...</p>
// 					) : notifications && notifications.data.length > 0 ? (
// 						<ul>
// 							{notifications.data.map((notification) => (
// 								<li
// 									key={notification._id}
// 									className={`bg-white border rounded-lg p-4 my-4 transition-all hover:shadow-md ${
// 										!notification.read ? "border-blue-500" : "border-gray-200"
// 									}`}
// 								>
// 									<div className='flex items-start justify-between'>
// 										<div className='flex items-center space-x-4'>
// 											<Link to={`/profile/${notification.relatedUser.username}`}>
// 												<img
// 													src={notification.relatedUser.profilePicture || "/avatar.png"}
// 													alt={notification.relatedUser.name}
// 													className='w-12 h-12 rounded-full object-cover'
// 												/>
// 											</Link>

// 											<div>
// 												<div className='flex items-center gap-2'>
// 													<div className='p-1 bg-gray-100 rounded-full'>
// 														{renderNotificationIcon(notification.type)}
// 													</div>
// 													<p className='text-sm'>{renderNotificationContent(notification)}</p>
// 												</div>
// 												<p className='text-xs text-gray-500 mt-1'>
// 													{formatDistanceToNow(new Date(notification.createdAt), {
// 														addSuffix: true,
// 													})}
// 												</p>
// 												{renderRelatedPost(notification.relatedPost)}
// 											</div>
// 										</div>

// 										<div className='flex gap-2'>
// 											{!notification.read && (
// 												<button
// 													onClick={() => markAsReadMutation(notification._id)}
// 													className='p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'
// 													aria-label='Mark as read'
// 												>
// 													<Eye size={16} />
// 												</button>
// 											)}

// 											<button
// 												onClick={() => deleteNotificationMutation(notification._id)}
// 												className='p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
// 												aria-label='Delete notification'
// 											>
// 												<Trash2 size={16} />
// 											</button>
// 										</div>
// 									</div>
// 								</li>
// 							))}
// 						</ul>
// 					) : (
// 						<p>No notification at the moment.</p>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default NotificationsPage;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { 
	ExternalLink, 
	Eye, 
	MessageSquare, 
	ThumbsUp, 
	Trash2, 
	UserPlus, 
	Bell, 
	Settings, 
	Search, 
	Filter,
	CheckCircle,
	Circle,
	BellOff
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const queryClient = useQueryClient();

	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => axiosInstance.get("/notifications"),
	});

	const { mutate: markAsReadMutation } = useMutation({
		mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
		},
	});

	const { mutate: deleteNotificationMutation } = useMutation({
		mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
			toast.success("Notification deleted");
		},
	});

	const renderNotificationIcon = (type) => {
		switch (type) {
			case "like":
				return <ThumbsUp className="w-5 h-5 text-red-800" />;
			case "comment":
				return <MessageSquare className="w-5 h-5 text-green-500" />;
			case "connectionAccepted":
		return <UserPlus className="w-5 h-5" style={{ color: '#159A9C' }} />;

			default:
				return <Bell className="w-5 h-5 text-gray-500" />;
		}
	};

	const renderNotificationContent = (notification) => {
		switch (notification.type) {
			case "like":
				return (
					<span className="text-gray-700">
						<strong className="text-gray-900">{notification.relatedUser.name}</strong> liked your post
					</span>
				);
			case "comment":
				return (
			<span className="text-gray-700">
  <Link
    to={`/profile/${notification.relatedUser.username}`}
    className="font-bold transition-colors"
    style={{ color: '#159A9C' }}
    onMouseOver={(e) => (e.currentTarget.style.color = '#107476')}
    onMouseOut={(e) => (e.currentTarget.style.color = '#159A9C')}
  >
    {notification.relatedUser.name}
  </Link>{" "}
  commented on your post
</span>

				);
			case "connectionAccepted":
				return (
					<span className="text-gray-700">
  <Link
    to={`/profile/${notification.relatedUser.username}`}
    className="font-bold transition-colors"
    style={{ color: '#159A9C' }}
    onMouseOver={(e) => (e.currentTarget.style.color = '#107476')}
    onMouseOut={(e) => (e.currentTarget.style.color = '#159A9C')}
  >
    {notification.relatedUser.name}
  </Link>{" "}
  accepted your connection request
</span>

				);
			default:
				return null;
		}
	};

	const renderRelatedPost = (relatedPost) => {
		if (!relatedPost) return null;

		return (
			<Link
				to={`/post/${relatedPost._id}`}
				className="mt-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl flex items-center space-x-3 hover:from-gray-100 hover:to-blue-100 transition-all duration-200 group"
			>
				{relatedPost.image && (
					<img 
						src={relatedPost.image} 
						alt="Post preview" 
						className="w-12 h-12 object-cover rounded-lg border-2 border-white shadow-sm" 
					/>
				)}
				<div className="flex-1 overflow-hidden">
					<p className="text-sm text-gray-700 truncate group-hover:text-gray-900 transition-colors">
						{relatedPost.content}
					</p>
				</div>
				<ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
			</Link>
		);
	};

	const unreadCount = notifications?.data?.filter(n => !n.read).length || 0;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-0">
	

			<div className="max-w-6xl mx-auto px-6 py-8">
				{/* Stats Overview */}
				{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Total Notifications</p>
								<p className="text-3xl font-bold text-blue-600">{notifications?.data?.length || 0}</p>
							</div>
							<div className="p-3 bg-blue-100 rounded-xl">
								<Bell className="w-6 h-6 text-blue-600" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Unread</p>
								<p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
							</div>
							<div className="p-3 bg-orange-100 rounded-xl">
								<Circle className="w-6 h-6 text-orange-600" />
							</div>
						</div>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">This Week</p>
								<p className="text-3xl font-bold text-green-600">
									{notifications?.data?.filter(n => {
										const weekAgo = new Date();
										weekAgo.setDate(weekAgo.getDate() - 7);
										return new Date(n.createdAt) > weekAgo;
									}).length || 0}
								</p>
							</div>
							<div className="p-3 bg-green-100 rounded-xl">
								<CheckCircle className="w-6 h-6 text-green-600" />
							</div>
						</div>
					</div>
				</div> */}

				{/* Notifications List */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100">
					<div className="p-6 border-b border-gray-100">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
							<div className="flex items-center space-x-3">
<button
  className="text-sm font-medium transition duration-200"
  style={{
    color: '#159A9C'
  }}
  onMouseOver={e => e.currentTarget.style.color = '#107476'}
  onMouseOut={e => e.currentTarget.style.color = '#159A9C'}
>
  Mark all as read
</button>

								<button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
									Clear all
								</button>
							</div>
						</div>
					</div>

					<div className="p-6">
						{isLoading ? (
							<div className="text-center py-16">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
								<p className="text-gray-600">Loading notifications...</p>
							</div>
						) : notifications && notifications.data.length > 0 ? (
							<div className="space-y-4">
								{notifications.data.map((notification) => (
									<div
										key={notification._id}
										className={`relative p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md group ${
											!notification.read 
												? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm" 
												: "bg-gray-50 border-gray-200 hover:bg-white"
										}`}
									>
									{!notification.read && (
  <div
    className="absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse"
    style={{ backgroundColor: '#159A9C' }}
  ></div>
)}

										
										<div className="flex items-start space-x-4">
											<Link 
												to={`/profile/${notification.relatedUser.username}`}
												className="flex-shrink-0"
											>
												<img
													src={notification.relatedUser.profilePicture || "/avatar.png"}
													alt={notification.relatedUser.name}
													className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md hover:shadow-lg transition-shadow duration-200"
												/>
											</Link>

											<div className="flex-1 min-w-0">
												<div className="flex items-center space-x-3 mb-2">
													<div className="p-2 bg-white rounded-xl shadow-sm">
														{renderNotificationIcon(notification.type)}
													</div>
													<div className="flex-1">
														<p className="text-base font-medium">
															{renderNotificationContent(notification)}
														</p>
														<p className="text-sm text-gray-500 mt-1">
															{formatDistanceToNow(new Date(notification.createdAt), {
																addSuffix: true,
															})}
														</p>
													</div>
												</div>
												{renderRelatedPost(notification.relatedPost)}
											</div>

											<div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
												{!notification.read && (
  <button
    onClick={() => markAsReadMutation(notification._id)}
    className="p-2 rounded-xl transition-colors duration-200"
    style={{
      backgroundColor: '#E0F7F8', // light version of #159A9C
      color: '#159A9C'
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C3EFF0'} // hover effect
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E0F7F8'}
    aria-label="Mark as read"
  >
    <Eye className="w-4 h-4" />
  </button>
)}


												<button
													onClick={() => deleteNotificationMutation(notification._id)}
													className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-200"
													aria-label="Delete notification"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-20">
								<div className="p-6 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl w-32 h-32 mx-auto flex items-center justify-center mb-6">
									<BellOff className="w-12 h-12 text-gray-500" />
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-3">All Caught Up!</h3>
								<p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
									You don't have any notifications at the moment. We'll notify you when there's new activity.
								</p>
								<button
								
									  style={{ backgroundColor: '#159A9C' }}
									  className="px-8 py-3  text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
									Explore Network
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationsPage;