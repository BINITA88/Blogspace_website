import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profilePicture: {
			type: String,
			default: "",
		},
		role: { type: Number, default: 0 },

		bannerImg: {
			type: String,
			default: "",
		},
		headline: {
			type: String,
			default: "Blogspace User",
		},
		location: {
			type: String,
			default: "Maitidevi",
		},
		about: {
			type: String,
			default: "",
		},
		skills: [String],
		experience: [
			{
				title: String,
				company: String,
				startDate: Date,
				endDate: Date,
				description: String,
			},
		],
		education: [
			{
				school: String,
				fieldOfStudy: String,
				startYear: Number,
				endYear: Number,
			},
		],
		connections: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   firstName: {
// 	type: String,
// 	required: true,
//   },
//   lastName: {
// 	type: String,
// 	required: true,
//   },
 
//   email: {
// 	type: String,
// 	required: true,
// 	unique: true,
//   },
//   password: {
// 	type: String,
// 	required: true,
//   },
//   isAdmin: {
// 	type: Boolean,
// 	default: false,
//   },
//   phone: {
// 	type: String,
//   },
//   resetPasswordOTP: {
// 	type: Number,
// 	default: null,
//   },
//   resetPasswordExpires: {
// 	type: Date,
// 	default: null,
//   },
//   profilePicture: {
// 	type: String,
//   },
//   googleId: {
// 	type: String,
// 	default: null,
//   },
//   coverphoto: { type: String },

//   friends: [
// 	{
// 	  type: mongoose.Schema.Types.ObjectId,
// 	  ref: "Friend",
// 	},
//   ],
// });

// // ✅ Prevent OverwriteModelError
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;