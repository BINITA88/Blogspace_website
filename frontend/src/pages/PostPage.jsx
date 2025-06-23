import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Post from "../components/Post";
import {
  Clock,
  Facebook,
  Instagram,
  Twitter,
  BookmarkPlus,
} from "lucide-react";
import { useState, useEffect } from "react";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    setSavedPosts(saved);
  }, []);

  const isSaved = (postId) => savedPosts.some((p) => p._id === postId);

  const toggleSavePost = (post) => {
    const existing = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const alreadySaved = existing.find((p) => p._id === post._id);

    let updated;
    if (alreadySaved) {
      updated = existing.filter((p) => p._id !== post._id);
    } else {
      updated = [...existing, post];
    }

    localStorage.setItem("savedPosts", JSON.stringify(updated));
    setSavedPosts(updated);
  };

  const {
    data: post,
    isLoading: postLoading,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/${postId}`);
      return res.data;
    },
    enabled: !!postId,
  });

  const {
    data: allPosts = [],
    isLoading: postsLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  const getRelatedPosts = () => {
    if (!post || !allPosts.length) return [];
    const others = allPosts.filter((p) => p._id !== post._id);
    const sameCategory = others.filter((p) => p.category === post.category);
    return [...sameCategory, ...others].slice(0, 5);
  };

  const relatedPosts = getRelatedPosts();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleRelatedPostClick = (id) => navigate(`/post/${id}`);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = encodeURIComponent(post?.title || "Check this out!");

    let shareURL = "";
    switch (platform) {
      case "facebook":
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareURL = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "instagram":
        alert("Instagram sharing is limited to mobile app.");
        return;
      default:
        return;
    }

    window.open(shareURL, "_blank");
  };

  if (postLoading) return <div className="text-center mt-20">Loading post...</div>;
  if (!post) return <div className="text-center mt-20 text-red-500">Post not found</div>;

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <Post post={post} />
        </div>
      </div>

      <aside className="space-y-6 sticky top-6 h-fit">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Share This Post</h3>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleShare("facebook")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
              title="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full"
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare("instagram")}
              className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full"
              title="Instagram (manual)"
            >
              <Instagram className="w-5 h-5" />
            </button>
          </div>

          {/* Save Post */}
          <button
            onClick={() => toggleSavePost(post)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-gray-700 w-full justify-center text-sm font-medium shadow-md ${
              isSaved(post._id)
                ? "bg-[#6bc8ca] hover:bg-teal-700"
                : "bg-[#5ec4c6] hover:bg-teal-700"
            }`}
          >
            <BookmarkPlus className="w-6 h-8" />
            {isSaved(post._id) ? "Save this post  ✨" : "Post saved 💾 so you remember it!"}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
          {postsLoading ? (
            <p className="text-sm text-gray-700">Loading related posts...</p>
          ) : relatedPosts.length > 0 ? (
            <div className="space-y-3">
              {relatedPosts.map((rp) => (
                <div
                  key={rp._id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                  onClick={() => handleRelatedPostClick(rp._id)}
                >
                  {rp.image ? (
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-xl rounded-lg">
                      {rp.title?.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-blue-600 font-medium mb-1 inline-block">
                      {rp.category}
                    </span>
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600">
                      {rp.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{rp.author?.name || "Anonymous"}</span>
                      <span>•</span>
                      <Clock size={12} />
                      <span>{formatDate(rp.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No related posts found.</p>
          )}
        </div>
      </aside>
    </div>
  );
};

export default PostPage;
