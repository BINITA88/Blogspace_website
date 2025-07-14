import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: String,
    url: { type: String, unique: true },
    summary: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export default BlogPost;
