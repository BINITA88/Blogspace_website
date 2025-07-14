// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { Image, Loader } from "lucide-react";

// const PostCreation = ({ user }) => {
// 	const [content, setContent] = useState("");
// 	const [image, setImage] = useState(null);
// 	const [imagePreview, setImagePreview] = useState(null);

// 	const queryClient = useQueryClient();

// 	const { mutate: createPostMutation, isPending } = useMutation({
// 		mutationFn: async (postData) => {
// 			const res = await axiosInstance.post("/posts/create", postData, {
// 				headers: { "Content-Type": "application/json" },
// 			});
// 			return res.data;
// 		},
// 		onSuccess: () => {
// 			resetForm();
// 			toast.success("Post created successfully");
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 		},
// 		onError: (err) => {
// 			toast.error(err.response.data.message || "Failed to create post");
// 		},
// 	});

// 	const handlePostCreation = async () => {
// 		try {
// 			const postData = { content };
// 			if (image) postData.image = await readFileAsDataURL(image);

// 			createPostMutation(postData);
// 		} catch (error) {
// 			console.error("Error in handlePostCreation:", error);
// 		}
// 	};

// 	const resetForm = () => {
// 		setContent("");
// 		setImage(null);
// 		setImagePreview(null);
// 	};

// 	const handleImageChange = (e) => {
// 		const file = e.target.files[0];
// 		setImage(file);
// 		if (file) {
// 			readFileAsDataURL(file).then(setImagePreview);
// 		} else {
// 			setImagePreview(null);
// 		}
// 	};

// 	const readFileAsDataURL = (file) => {
// 		return new Promise((resolve, reject) => {
// 			const reader = new FileReader();
// 			reader.onloadend = () => resolve(reader.result);
// 			reader.onerror = reject;
// 			reader.readAsDataURL(file);
// 		});
// 	};

// 	return (
// 		<div className='bg-secondary rounded-lg shadow mb-4 p-4'>
// 			<div className='flex space-x-3'>
// 				<img src={user.profilePicture || "/avatar.png"} alt={user.name} className='size-12 rounded-full' />
// 				<textarea
// 					placeholder="What's on your mind?"
// 					className='w-full p-3 rounded-lg bg-base-100 hover:bg-base-200 focus:bg-base-200 focus:outline-none resize-none transition-colors duration-200 min-h-[100px]'
// 					value={content}
// 					onChange={(e) => setContent(e.target.value)}
// 				/>
// 			</div>

// 			{imagePreview && (
// 				<div className='mt-4'>
// 					<img src={imagePreview} alt='Selected' className='w-full h-auto rounded-lg' />
// 				</div>
// 			)}

// 			<div className='flex justify-between items-center mt-4'>
// 				<div className='flex space-x-4'>
// 					<label className='flex items-center text-info hover:text-info-dark transition-colors duration-200 cursor-pointer'>
// 						<Image size={20} className='mr-2' />
// 						<span>Photo</span>
// 						<input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
// 					</label>
// 				</div>

// 				<button
// 					className='bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors duration-200'
// 					onClick={handlePostCreation}
// 					disabled={isPending}
// 				>
// 					{isPending ? <Loader className='size-5 animate-spin' /> : "Share"}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };
// export default PostCreation;


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader, X, Tag, User, Sparkles } from "lucide-react";

// Professional categories
const categories = [
  "Art & Design",
  "Technology",
  "Science",
  "Daily Life",
  "Travel",
  "Health & Wellness",
  "Education",
  "Food",
  "Business & Finance",
  "Inspiration & Motivation",
  "Fashion & Beauty",
  "Parenting",
  "Gaming",
  "Entertainment",
  "Books & Literature",
  "Other",
];

const PostCreation = ({ user }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("Other");

  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create post");
    },
  });

  const handlePostCreation = async () => {
    try {
      const postData = { content, category };
      if (image) postData.image = await readFileAsDataURL(image);
      createPostMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation:", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
    setCategory("Other");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      readFileAsDataURL(file).then(setImagePreview);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const canPost = content.trim().length > 0;

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mt-6 mb-6'>
      {/* Header */}
      <div className='p-6 pb-0'>
        <div className=''>
          <div className='flex items-center space-x-4'>
            <div className='relative group'>
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className='w-14 h-14 rounded-full object-cover border-[3px] border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300'
              />
              <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm'></div>
            </div>
            <div className='flex-1'>
              <div className='flex items-center space-x-2'>
                {/* <User size={16} className='text-indigo-500' /> */}
                <span className='font-semibold text-gray-900'>{user.name}</span>
                {/* <Sparkles size={14} className='text-yellow-400' /> */}
              </div>
              <p className='text-sm text-gray-600 mt-1'>Share something inspiring with the world</p>
            </div>
          </div>
        </div>

        {/* Content Input */}
        <div className='space-y-4 mt-4'>
          <div className='relative'>
            <textarea
              placeholder='Share your thoughts or insights...'
              className='w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white min-h-[120px]'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {content.length > 0 && (
              <div className='absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded border'>
                {content.length}
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='flex items-center text-sm font-medium text-gray-700 mb-2'>
                <Tag size={14} className='mr-2' />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-700'
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className='relative'>
              <div className='relative rounded-lg overflow-hidden border border-gray-200'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='w-full h-auto max-h-80 object-cover'
                />
                <button
                  onClick={removeImage}
                  className='absolute top-3 right-3 bg-white hover:bg-gray-100 text-gray-600 rounded-full p-2 shadow-sm transition-colors duration-200'
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <label className='flex items-center text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200'>
            <Image size={18} className='mr-2' />
            <span className='text-sm font-medium'>Attach Image</span>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </label>

          {category !== "Other" && (
            <div className='flex items-center text-xs text-gray-500'>
              <Tag size={12} className='mr-1' />
              {category}
            </div>
          )}
        </div>

        <div className='flex items-center space-x-3'>
          {canPost && (
            <span className='text-xs text-gray-500'>Ready to post</span>
          )}

        <button
  style={canPost && !isPending ? { backgroundColor: '#159A9C' } : undefined}
  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
    canPost && !isPending
      ? "text-white shadow-sm hover:shadow-md"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
  }`}
  onClick={handlePostCreation}
  disabled={!canPost || isPending}
>
  {isPending ? (
    <>
      <Loader className="w-4 h-4 animate-spin" />
      <span>Publishing...</span>
    </>
  ) : (
    <span>Publish Post</span>
  )}
</button>

        </div>
      </div>
    </div>
  );
};

export default PostCreation;
