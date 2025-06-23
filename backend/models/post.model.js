import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		content: { type: String },
		image: { type: String },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		category: {
			type: String,
			enum: ["Art & Design",
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
  "Books & Literature"
], // limit to specific values
			default: "Other",
			required: true,
		},
		comments: [
			{
				content: { type: String },
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				createdAt: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
