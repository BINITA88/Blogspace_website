import { useEffect, useState } from "react";
import Post from "../components/Post";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    setSavedPosts(saved);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))
      ) : (
        <div className="col-span-1 lg:col-span-3 text-center text-gray-500">
          No saved posts yet.
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
