import { useEffect, useState } from "react";
import Post from "../components/Post";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    setSavedPosts(saved);
  }, []);

  const handleDelete = (id) => {
    const updatedPosts = savedPosts.filter((post) => post._id !== id);
    setSavedPosts(updatedPosts);
    localStorage.setItem("savedPosts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">
        🔖 Bookmarked Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 h-[400px] overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="flex-1 overflow-auto">
                <Post post={post} />
              </div>
              <button
                onClick={() => handleDelete(post._id)}
                className="mt-4 bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium py-2 px-4 rounded transition"
              >
                🗑 Remove Bookmark
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            You haven’t bookmarked any posts yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
