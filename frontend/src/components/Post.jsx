// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { Link, useParams } from "react-router-dom";
// import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

// import PostAction from "./PostAction";

// const Post = ({ post }) => {
// 	const { postId } = useParams();

// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
// 	const [showComments, setShowComments] = useState(false);
// 	const [newComment, setNewComment] = useState("");
// 	const [comments, setComments] = useState(post.comments || []);
// 	const isOwner = authUser._id === post.author._id;
// 	const isLiked = post.likes.includes(authUser._id);

// 	const queryClient = useQueryClient();

// 	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
// 		mutationFn: async () => {
// 			await axiosInstance.delete(`/posts/delete/${post._id}`);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			toast.success("Post deleted successfully");
// 		},
// 		onError: (error) => {
// 			toast.error(error.message);
// 		},
// 	});

// 	const { mutate: createComment, isPending: isAddingComment } = useMutation({
// 		mutationFn: async (newComment) => {
// 			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			toast.success("Comment added successfully");
// 		},
// 		onError: (err) => {
// 			toast.error(err.response.data.message || "Failed to add comment");
// 		},
// 	});

// 	const { mutate: likePost, isPending: isLikingPost } = useMutation({
// 		mutationFn: async () => {
// 			await axiosInstance.post(`/posts/${post._id}/like`);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			queryClient.invalidateQueries({ queryKey: ["post", postId] });
// 		},
// 	});

// 	const handleDeletePost = () => {
// 		if (!window.confirm("Are you sure you want to delete this post?")) return;
// 		deletePost();
// 	};

// 	const handleLikePost = async () => {
// 		if (isLikingPost) return;
// 		likePost();
// 	};

// 	const handleAddComment = async (e) => {
// 		e.preventDefault();
// 		if (newComment.trim()) {
// 			createComment(newComment);
// 			setNewComment("");
// 			setComments([
// 				...comments,
// 				{
// 					content: newComment,
// 					user: {
// 						_id: authUser._id,
// 						name: authUser.name,
// 						profilePicture: authUser.profilePicture,
// 					},
// 					createdAt: new Date(),
// 				},
// 			]);
// 		}
// 	};

// 	return (
// 		<div className='bg-secondary rounded-lg shadow mb-4'>
// 			<div className='p-4'>
// 				<div className='flex items-center justify-between mb-4'>
// 					<div className='flex items-center'>
// 						<Link to={`/profile/${post?.author?.username}`}>
// 							<img
// 								src={post.author.profilePicture || "/avatar.png"}
// 								alt={post.author.name}
// 								className='size-10 rounded-full mr-3'
// 							/>
// 						</Link>

// 						<div>
// 							<Link to={`/profile/${post?.author?.username}`}>
// 								<h3 className='font-semibold'>{post.author.name}</h3>
// 							</Link>
// 							<p className='text-xs text-info'>{post.author.headline}</p>
// 							<p className='text-xs text-info'>
// 								{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
// 							</p>
// 						</div>
// 					</div>
// 					{isOwner && (
// 						<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
// 							{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
// 						</button>
// 					)}
// 				</div>
// 				<p className='mb-4'>{post.content}</p>
// 				<p className='mb-4'>{post.category}</p>

// 				{post.image && <img src={post.image} alt='Post content' className='rounded-lg w-full mb-4' />}

// 				<div className='flex justify-between text-info'>
// 					<PostAction
// 						icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
// 						text={`Like (${post.likes.length})`}
// 						onClick={handleLikePost}
// 					/>

// 					<PostAction
// 						icon={<MessageCircle size={18} />}
// 						text={`Comment (${comments.length})`}
// 						onClick={() => setShowComments(!showComments)}
// 					/>
// 					<PostAction icon={<Share2 size={18} />} text='Share' />
// 				</div>
// 			</div>

// 			{showComments && (
// 				<div className='px-4 pb-4'>
// 					<div className='mb-4 max-h-60 overflow-y-auto'>
// 						{comments.map((comment) => (
// 							<div key={comment._id} className='mb-2 bg-base-100 p-2 rounded flex items-start'>
// 								<img
// 									src={comment.user.profilePicture || "/avatar.png"}
// 									alt={comment.user.name}
// 									className='w-8 h-8 rounded-full mr-2 flex-shrink-0'
// 								/>
// 								<div className='flex-grow'>
// 									<div className='flex items-center mb-1'>
// 										<span className='font-semibold mr-2'>{comment.user.name}</span>
// 										<span className='text-xs text-info'>
// 											{formatDistanceToNow(new Date(comment.createdAt))}
// 										</span>
// 									</div>
// 									<p>{comment.content}</p>
// 								</div>
// 							</div>
// 						))}
// 					</div>

// 					<form onSubmit={handleAddComment} className='flex items-center'>
// 						<input
// 							type='text'
// 							value={newComment}
// 							onChange={(e) => setNewComment(e.target.value)}
// 							placeholder='Add a comment...'
// 							className='flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary'
// 						/>

// 						<button
// 							type='submit'
// 							className='bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300'
// 							disabled={isAddingComment}
// 						>
// 							{isAddingComment ? <Loader size={18} className='animate-spin' /> : <Send size={18} />}
// 						</button>
// 					</form>
// 				</div>
// 			)}
// 		</div>
// 	);
// };
// export default Post;


// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { Link, useParams } from "react-router-dom";
// import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

// import PostAction from "./PostAction";

// const Post = ({ post }) => {
// 	const { postId } = useParams();

// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
// 	const [showComments, setShowComments] = useState(false);
// 	const [newComment, setNewComment] = useState("");
// 	const [comments, setComments] = useState(post.comments || []);
// 	const isOwner = authUser._id === post.author._id;
// 	const isLiked = post.likes.includes(authUser._id);

// 	const queryClient = useQueryClient();

// 	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
// 		mutationFn: async () => {
// 			await axiosInstance.delete(`/posts/delete/${post._id}`);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			toast.success("Post deleted successfully");
// 		},
// 		onError: (error) => {
// 			toast.error(error.message);
// 		},
// 	});

// 	const { mutate: createComment, isPending: isAddingComment } = useMutation({
// 		mutationFn: async (newComment) => {
// 			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			toast.success("Comment added successfully");
// 		},
// 		onError: (err) => {
// 			toast.error(err.response.data.message || "Failed to add comment");
// 		},
// 	});

// 	const { mutate: likePost, isPending: isLikingPost } = useMutation({
// 		mutationFn: async () => {
// 			await axiosInstance.post(`/posts/${post._id}/like`);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			queryClient.invalidateQueries({ queryKey: ["post", postId] });
// 		},
// 	});

// 	const handleDeletePost = () => {
// 		if (!window.confirm("Are you sure you want to delete this post?")) return;
// 		deletePost();
// 	};

// 	const handleLikePost = async () => {
// 		if (isLikingPost) return;
// 		likePost();
// 	};

// 	const handleAddComment = async (e) => {
// 		e.preventDefault();
// 		if (newComment.trim()) {
// 			createComment(newComment);
// 			setNewComment("");
// 			setComments([
// 				...comments,
// 				{
// 					content: newComment,
// 					user: {
// 						_id: authUser._id,
// 						name: authUser.name,
// 						profilePicture: authUser.profilePicture,
// 					},
// 					createdAt: new Date(),
// 				},
// 			]);
// 		}
// 	};

// 	return (
// 		<div className='bg-secondary w-auto rounded-lg shadow mb-4'>
// 			<div className='p-4'>
// 				<div className='flex items-center justify-between mb-4'>
// 					<div className='flex items-center'>
// 						<Link to={`/profile/${post?.author?.username}`}>
// 							<img
// 								src={post.author.profilePicture || "/avatar.png"}
// 								alt={post.author.name}
// 								className='size-10 rounded-full mr-3'
// 							/>
// 						</Link>

// 						<div>
// 							<Link to={`/profile/${post?.author?.username}`}>
// 								<h3 className='font-semibold'>{post.author.name}</h3>
// 							</Link>
// 							<p className='text-xs text-info'>{post.author.headline}</p>
// 							<p className='text-xs text-info'>
// 								{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
// 							</p>
// 						</div>
// 					</div>
// 					{isOwner && (
// 						<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
// 							{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
// 						</button>
// 					)}
// 				</div>
// 				{post.category && (
// 	<p className='mb-2 text-sm font-medium text-info'>
// 		Article about <span className='text-primary'>{post.category}</span>
// 	</p>
// )}


// 				<p className='mb-4'>{post.content}</p>

// 				{post.image && <img src={post.image} alt='Post content' className='rounded-lg w-full mb-4' />}

// 				<div className='flex justify-between text-info'>
// 					<PostAction
// 						icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
// 						text={`Like (${post.likes.length})`}
// 						onClick={handleLikePost}
// 					/>

// 					<PostAction
// 						icon={<MessageCircle size={18} />}
// 						text={`Comment (${comments.length})`}
// 						onClick={() => setShowComments(!showComments)}
// 					/>
// 					<PostAction icon={<Share2 size={18} />} text='Share' />
// 				</div>
// 			</div>

// 			{showComments && (
// 				<div className='px-4 pb-4'>
// 					<div className='mb-4 max-h-60 overflow-y-auto'>
// 						{comments.map((comment, index) => (
// 							<div key={index} className='mb-2 bg-base-100 p-2 rounded flex items-start'>
// 								<img
// 									src={comment.user.profilePicture || "/avatar.png"}
// 									alt={comment.user.name}
// 									className='w-8 h-8 rounded-full mr-2 flex-shrink-0'
// 								/>
// 								<div className='flex-grow'>
// 									<div className='flex items-center mb-1'>
// 										<span className='font-semibold mr-2'>{comment.user.name}</span>
// 										<span className='text-xs text-info'>
// 											{formatDistanceToNow(new Date(comment.createdAt))}
// 										</span>
// 									</div>
// 									<p>{comment.content}</p>
// 								</div>
// 							</div>
// 						))}
// 					</div>

// 					<form onSubmit={handleAddComment} className='flex items-center'>
// 						<input
// 							type='text'
// 							value={newComment}
// 							onChange={(e) => setNewComment(e.target.value)}
// 							placeholder='Add a comment...'
// 							className='flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary'
// 						/>

// 						<button
// 							type='submit'
// 							className='bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300'
// 							disabled={isAddingComment}
// 						>
// 							{isAddingComment ? <Loader size={18} className='animate-spin' /> : <Send size={18} />}
// 						</button>
// 					</form>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Post;



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { 
	Loader, 
	MessageCircle, 
	Send, 
	Share2, 
	ThumbsUp, 
	Trash2, 
	MoreHorizontal,
	Heart,
	Bookmark,
	Eye
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import PostAction from "./PostAction";

const Post = ({ post }) => {
	const { postId } = useParams();

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState(post.comments || []);
	const [showDropdown, setShowDropdown] = useState(false);
	
	const isOwner = authUser._id === post.author._id;
	const isLiked = post.likes.includes(authUser._id);

	const queryClient = useQueryClient();

	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.delete(`/posts/delete/${post._id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post deleted successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: createComment, isPending: isAddingComment } = useMutation({
		mutationFn: async (newComment) => {
			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Comment added successfully");
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to add comment");
		},
	});

	const { mutate: likePost, isPending: isLikingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(`/posts/${post._id}/like`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
		},
	});

	const handleDeletePost = () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		deletePost();
		setShowDropdown(false);
	};

	const handleLikePost = async () => {
		if (isLikingPost) return;
		likePost();
	};

	const handleAddComment = async (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			createComment(newComment);
			setNewComment("");
			setComments([
				...comments,
				{
					content: newComment,
					user: {
						_id: authUser._id,
						name: authUser.name,
						profilePicture: authUser.profilePicture,
					},
					createdAt: new Date(),
				},
			]);
		}
	};

	return (
		<article className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 mb-6 overflow-hidden'>
			{/* Header */}
			<header className='p-6 pb-4'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center space-x-3'>
						<Link 
							to={`/profile/${post?.author?.username}`}
							className='flex-shrink-0 group'
						>
							<div className='relative'>
								<img
									src={post.author.profilePicture || "/avatar.png"}
									alt={post.author.name}
									className='w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-200'
								/>
								<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
							</div>
						</Link>

						<div className='flex-1 min-w-0'>
							<Link 
								to={`/profile/${post?.author?.username}`}
								className='group'
							>
								<h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate'>
									{post.author.name}
								</h3>
							</Link>
							<p className='text-sm text-gray-600 mb-1 truncate'>{post.author.headline}</p>
							<div className='flex items-center space-x-2 text-xs text-gray-500'>
								<time dateTime={post.createdAt}>
									{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
								</time>
								<span>•</span>
								<div className='flex items-center space-x-1'>
									<Eye size={12} />
									<span>Public</span>
								</div>
							</div>
						</div>
					</div>

					{/* Options Menu */}
					<div className='relative'>
						<button 
							onClick={() => setShowDropdown(!showDropdown)}
							className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
						>
							<MoreHorizontal size={20} className='text-gray-500' />
						</button>
						
						{showDropdown && (
							<div className='absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10'>
								<button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2'>
									<Bookmark size={16} />
									<span>Save post</span>
								</button>
								<button className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2'>
									<Share2 size={16} />
									<span>Copy link</span>
								</button>
								{isOwner && (
									<>
										<hr className='my-2' />
										<button 
											onClick={handleDeletePost}
											className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2'
										>
											{isDeletingPost ? (
												<Loader size={16} className='animate-spin' />
											) : (
												<Trash2 size={16} />
											)}
											<span>Delete post</span>
										</button>
									</>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Category Badge */}
				{post.category && (
					<div className='mt-4'>
						<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200'>
							📄 Article about {post.category}
						</span>
					</div>
				)}
			</header>

			{/* Content */}
			<div className='px-6'>
				<div className='prose prose-gray max-w-none'>
					<p className='text-gray-800 leading-relaxed whitespace-pre-wrap'>
						{post.content}
					</p>
				</div>

				{/* Image */}
				{post.image && (
					<div className='mt-4 rounded-xl overflow-hidden bg-gray-100'>
						<img 
							src={post.image} 
							alt='Post content' 
							className='w-full h-auto object-cover hover:scale-105 transition-transform duration-500' 
						/>
					</div>
				)}
			</div>

			{/* Engagement Stats */}
			<div className='px-6 py-3'>
				<div className='flex items-center justify-between text-sm text-gray-500 border-b border-gray-100 pb-3'>
					<div className='flex items-center space-x-4'>
						{post.likes.length > 0 && (
							<div className='flex items-center space-x-1'>
								<div className='flex -space-x-1'>
									<div className='w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center'>
										<ThumbsUp size={10} className='text-white' />
									</div>
									<div className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center'>
										<Heart size={10} className='text-white' />
									</div>
								</div>
								<span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
							</div>
						)}
					</div>
					
					<div className='flex items-center space-x-4'>
						{comments.length > 0 && (
							<span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
						)}
						<span>12 shares</span>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='px-6 py-3'>
				<div className='grid grid-cols-3 gap-2'>
					<button
						onClick={handleLikePost}
						disabled={isLikingPost}
						className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
							isLiked 
								? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
								: 'text-gray-600 hover:bg-gray-50'
						}`}
					>
						{isLikingPost ? (
							<Loader size={18} className='animate-spin' />
						) : (
							<ThumbsUp size={18} className={isLiked ? "fill-current" : ""} />
						)}
						<span className='text-sm'>Like</span>
					</button>

					<button
						onClick={() => setShowComments(!showComments)}
						className='flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200'
					>
						<MessageCircle size={18} />
						<span className='text-sm'>Comment</span>
					</button>

					<button className='flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200'>
						<Share2 size={18} />
						<span className='text-sm'>Share</span>
					</button>
				</div>
			</div>

			{/* Comments Section */}
			{showComments && (
				<div className='border-t border-gray-100 bg-gray-50'>
					{/* Add Comment Form */}
					<div className='p-4 bg-white border-b border-gray-100'>
						<form onSubmit={handleAddComment} className='flex items-start space-x-3'>
							<img
								src={authUser?.profilePicture || "/avatar.png"}
								alt={authUser?.name}
								className='w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1'
							/>
							<div className='flex-1'>
								<div className='relative'>
									<textarea
										value={newComment}
										onChange={(e) => setNewComment(e.target.value)}
										placeholder='Write a comment...'
										rows="2"
										className='w-full p-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200'
									/>
									<button
										type='submit'
										disabled={isAddingComment || !newComment.trim()}
										className='absolute bottom-2 right-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
									>
										{isAddingComment ? (
											<Loader size={16} className='animate-spin' />
										) : (
											<Send size={16} />
										)}
									</button>
								</div>
							</div>
						</form>
					</div>

					{/* Comments List */}
					<div className='max-h-80 overflow-y-auto'>
						{comments.map((comment, index) => (
							<div key={index} className='p-4 hover:bg-gray-50 transition-colors duration-200'>
								<div className='flex items-start space-x-3'>
									<img
										src={comment.user.profilePicture || "/avatar.png"}
										alt={comment.user.name}
										className='w-8 h-8 rounded-full object-cover flex-shrink-0'
									/>
									<div className='flex-1 min-w-0'>
										<div className='bg-gray-100 rounded-2xl px-4 py-2'>
											<div className='flex items-center space-x-2 mb-1'>
												<span className='font-semibold text-sm text-gray-900'>
													{comment.user.name}
												</span>
											</div>
											<p className='text-gray-800 text-sm leading-relaxed'>
												{comment.content}
											</p>
										</div>
										<div className='flex items-center space-x-4 mt-2 ml-4'>
											<button className='text-xs text-gray-500 hover:text-gray-700 font-medium'>
												Like
											</button>
											<button className='text-xs text-gray-500 hover:text-gray-700 font-medium'>
												Reply
											</button>
											<span className='text-xs text-gray-500'>
												{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
						
					</div>
				</div>
			)}

			{/* Click outside to close dropdown */}
			{showDropdown && (
				<div 
					className='fixed inset-0 z-0' 
					onClick={() => setShowDropdown(false)}
				></div>
			)}
		</article>
	);
};

export default Post;