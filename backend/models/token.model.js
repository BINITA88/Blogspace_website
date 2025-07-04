import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },  // expires in 1 hour
});

export default mongoose.model("Token", tokenSchema);
