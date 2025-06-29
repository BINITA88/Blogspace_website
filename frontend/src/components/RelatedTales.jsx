import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedTales = ({ posts, currentPostId }) => {
  const navigate = useNavigate();
  const relatedPosts = posts.filter(post => post._id !== currentPostId);

  return (
    <div className="mt-14 bg-[#a9d0e0] p-4 rounded-xl border border-[#915c39] shadow-sm">
      <h3 className="text-lg font-semibold text-[#5c3a1e] mb-4">📖 Related Posts</h3>

      <div className="space-y-3">
        {relatedPosts.map(post => (
          <div
            key={post._id}
            className="flex items-start gap-3 p-2 rounded-lg border border-[#e9d9c5] bg-[#fffaf4] hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            {/* Circular Image */}
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-12 h-12 rounded-full object-cover border border-[#c8a989]"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#a77f64] to-[#7e4a2d] text-white font-bold text-sm">
                {post.title?.charAt(0)?.toUpperCase() || "P"}
              </div>
            )}

            {/* Text */}
            <div className="flex flex-col leading-tight">
              {post.category && (
                <span className="text-[10px] text-white bg-[#9e573c] px-2 py-[2px] rounded-full w-fit mb-1 font-semibold">
                  {post.category}
                </span>
              )}
              <p className="text-sm font-medium text-[#4a2b17] line-clamp-2">
                {post.title}
              </p>
              <p className="text-[11px] text-[#6e4e38]">By {post.author?.name || "Anonymous"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedTales;
