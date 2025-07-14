// import mongoose from "mongoose";

// const connectionRequestSchema = new mongoose.Schema(
// 	{
// 		 name: { type: String, required: true },
//     email: { type: String, required: true },
//     message: { type: String, required: true },
// 		sender: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 		recipient: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 		status: {
// 			type: String,
// 			enum: ["pending", "accepted", "rejected"],
// 			default: "pending",
// 		},
// 	},
// 	{ timestamps: true }
// );

// const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

// export default ConnectionRequest;



import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {

		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
		},
	},
	{ timestamps: true }
);


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

export default ConnectionRequest;
