import { useQuery } from "@tanstack/react-query";
import { Send, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { axiosInstance } from "../lib/axios"; // adjust path as needed

function CommentsSection({
  comments = [],
  onSubmitComment,
  commentValue,
  onCommentChange,
}) {
  // Fetch authenticated user info inside this component
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => axiosInstance.get("/authUser").then((res) => res.data),
  });

  // While loading auth user info
  if (isLoading) {
    return <div>Loading user info...</div>;
  }

  const userProfilePicture = authUser?.profilePicture || "/avatar.png";
  const authUserName = authUser?.username || "User";

  return (
    <div className="border rounded-lg bg-[#a9d0e0] shadow-lg p-12 px-12 w-80%">
      {/* Authenticated user name + image + like info */}
      <div className="flex justify-between items-center mb-5 border-b border-gray-300 pb-3">
        <div className="flex items-center gap-4">
          <img
            src={userProfilePicture}
            alt="Auth user"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-400"
          />
          <span className="text-gray-800 font-semibold">{authUserName}</span>

          {/* Like section */}
          <div className="flex items-center gap-2 text-lm text-teal-700 ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-8 text-pink-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.44C11.59 5.01 13.26 4 15 4c2.5 0 4.5 2 4.5 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>
              Liked by <strong>Jummy</strong> and <strong>8 others</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Comments heading */}
      <div className="mb-8">
        <h3 className="font-semibold text-xl flex items-center gap-3 text-gray-800">
          <MessageCircle size={24} className="text-teal-600" /> Comments ({comments.length})
        </h3>
      </div>

      {/* Comment input box */}
      <div className="flex items-center gap-4 mb-6">
        {userProfilePicture ? (
          <img
            src={userProfilePicture}
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-400"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center font-semibold text-teal-700 text-lg select-none">
            {authUserName?.charAt(0) || "U"}
          </div>
        )}

        <div className="flex-grow relative">
          <textarea
            rows={2}
            placeholder="Write a comment..."
            value={commentValue}
            onChange={(e) => onCommentChange(e.target.value)}
            className="w-full resize-none rounded-xl border border-teal-300 px-5 py-3 pr-14 shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300 bg-white text-gray-900"
          />
          <button
            onClick={onSubmitComment}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send comment"
            disabled={!commentValue.trim()}
          >
            <Send size={22} />
          </button>
        </div>
      </div>

      {/* Comment list */}
      <div className="space-y-5">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="p-4 hover:bg-white hover:shadow-lg transition-colors duration-300 rounded-xl bg-white"
          >
            <div className="flex items-start space-x-4">
              <img
                src={comment.user.profilePicture || "/avatar.png"}
                alt={comment.user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-1 ring-teal-200"
              />
              <div className="flex-1 min-w-0">
                <div className="rounded-2xl px-5 py-3 bg-teal-50 border border-teal-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-teal-800">{comment.user.name}</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-6 mt-3 ml-5 text-xs text-teal-600">
                  <button className="hover:text-teal-800 font-semibold cursor-pointer transition duration-300">
                    Like
                  </button>
                  <button className="hover:text-teal-800 font-semibold cursor-pointer transition duration-300">
                    Reply
                  </button>
                  <span className="select-none">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
