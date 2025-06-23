import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getSuggestedConnections = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user._id).select("connections");

		// find users who are not already connected, and also do not recommend our own profile!! right?
		const suggestedUser = await User.find({
			_id: {
				$ne: req.user._id,
				$nin: currentUser.connections,
			},
		})
			.select("name username profilePicture headline")
			.limit(3);

		res.json(suggestedUser);
	} catch (error) {
		console.error("Error in getSuggestedConnections controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getPublicProfile = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username }).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		console.error("Error in getPublicProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const allowedFields = [
			"name",
			"username",
			"headline",
			"about",
			"location",
			"profilePicture",
			"bannerImg",
			"skills",
			"experience",
			"education",
		];

		const updatedData = {};

		for (const field of allowedFields) {
			if (req.body[field]) {
				updatedData[field] = req.body[field];
			}
		}

		if (req.body.profilePicture) {
			const result = await cloudinary.uploader.upload(req.body.profilePicture);
			updatedData.profilePicture = result.secure_url;
		}

		if (req.body.bannerImg) {
			const result = await cloudinary.uploader.upload(req.body.bannerImg);
			updatedData.bannerImg = result.secure_url;
		}

		const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select(
			"-password"
		);

		res.json(user);
	} catch (error) {
		console.error("Error in updateProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
// import userModel from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import sendEmailOtp from "../service/sendEmailOtp.js";
// import sendOtp from "../service/sendOtp.js";
// import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new OAuth2Client(process.env.CLIENT_ID);
// import cloudinary from "../lib/cloudinary.js";

// export const getSuggestedConnections = async (req, res) => {
// 	try {
// 		const currentUser = await User.findById(req.user._id).select("connections");

// 		// find users who are not already connected, and also do not recommend our own profile!! right?
// 		const suggestedUser = await User.find({
// 			_id: {
// 				$ne: req.user._id,
// 				$nin: currentUser.connections,
// 			},
// 		})
// 			.select("name username profilePicture headline")
// 			.limit(3);

// 		res.json(suggestedUser);
// 	} catch (error) {
// 		console.error("Error in getSuggestedConnections controller:", error);
// 		res.status(500).json({ message: "Server error" });
// 	}
// };

// export const getPublicProfile = async (req, res) => {
// 	try {
// 		const user = await User.findOne({ username: req.params.username }).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ message: "User not found" });
// 		}

// 		res.json(user);
// 	} catch (error) {
// 		console.error("Error in getPublicProfile controller:", error);
// 		res.status(500).json({ message: "Server error" });
// 	}
// };

// export const updateProfile = async (req, res) => {
// 	try {
// 		const allowedFields = [
// 			"name",
// 			"username",
// 			"headline",
// 			"about",
// 			"location",
// 			"profilePicture",
// 			"bannerImg",
// 			"skills",
// 			"experience",
// 			"education",
// 		];

// 		const updatedData = {};

// 		for (const field of allowedFields) {
// 			if (req.body[field]) {
// 				updatedData[field] = req.body[field];
// 			}
// 		}

// 		if (req.body.profilePicture) {
// 			const result = await cloudinary.uploader.upload(req.body.profilePicture);
// 			updatedData.profilePicture = result.secure_url;
// 		}

// 		if (req.body.bannerImg) {
// 			const result = await cloudinary.uploader.upload(req.body.bannerImg);
// 			updatedData.bannerImg = result.secure_url;
// 		}

// 		const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select(
// 			"-password"
// 		);

// 		res.json(user);
// 	} catch (error) {
// 		console.error("Error in updateProfile controller:", error);
// 		res.status(500).json({ message: "Server error" });
// 	}
// };

// export const createUser = async (req, res) => {
// 	const { firstName, lastName, email, password } = req.body;
  
// 	if (!firstName || !lastName || !email || !password ) {
// 	  return res.status(400).json({
// 		success: false,
// 		message: "Please fill all the fields",
// 	  });
// 	}
  
// 	try {
// 	  const existingUser = await userModel.findOne({ email });
  
// 	  if (existingUser) {
// 		return res.status(400).json({
// 		  success: false,
// 		  message: "User already exists",
// 		});
// 	  }
  
// 	  const salt = await bcrypt.genSalt(10);
// 	  const hashedPassword = await bcrypt.hash(password, salt);
  
// 	  const newUser = new userModel({
// 		firstName,
// 		lastName,
// 		email,
// 		password: hashedPassword,

// 	  });
  
// 	  await newUser.save();
  
// 	  res.status(201).json({
// 		success: true,
// 		message: "User created successfully",
// 	  });
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).json({
// 		success: false,
// 		message: "Internal server error",
// 	  });
// 	}
//   };
  

// // Login user
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
// 	return res.status(400).json({
// 	  success: false,
// 	  message: "Please enter all the fields",
// 	});
//   }

//   try {
// 	const user = await userModel.findOne({ email });

// 	if (!user) {
// 	  return res.status(400).json({
// 		success: false,
// 		message: "User not found",
// 	  });
// 	}

// 	const isValidPassword = await bcrypt.compare(password, user.password);
// 	if (!isValidPassword) {
// 	  return res.status(400).json({
// 		success: false,
// 		message: "Invalid credentials",
// 	  });
// 	}

// 	const token = jwt.sign(
// 	  { id: user._id, isAdmin: user.isAdmin },
// 	  process.env.JWT_SECRET
// 	);

// 	res.status(200).json({
// 	  success: true,
// 	  message: "Login successful",
// 	  token,
// 	  userData: {
// 		id: user._id,
// 		firstName: user.firstName,
// 		lastName: user.lastName,
// 		email: user.email,
// 		isAdmin: user.isAdmin,
// 		profilePicture: user.profilePicture,
// 	  },
// 	});
//   } catch (error) {
// 	console.error(error);
// 	res.status(500).json({
// 	  success: false,
// 	  message: "Internal server error",
// 	});
//   }
// };

// // Forgot Password
// export const forgotPassword = async (req, res) => {
//   const { contact } = req.body;

//   if (!contact) {
// 	return res.status(400).json({
// 	  success: false,
// 	  message: "Please enter your phone number or email",
// 	});
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^[0-9]{10}$/;

//   let email, phone;

//   if (emailRegex.test(contact)) {
// 	email = contact;
//   } else if (phoneRegex.test(contact)) {
// 	phone = contact;
//   } else {
// 	return res.status(400).json({
// 	  success: false,
// 	  message: "Invalid phone number or email",
// 	});
//   }

//   try {
// 	const user = await userModel.findOne(email ? { email } : { phone });

// 	if (!user) {
// 	  return res.status(404).json({
// 		success: false,
// 		message: "User not found",
// 	  });
// 	}

// 	const randomOTP = Math.floor(100000 + Math.random() * 900000);
// 	user.resetPasswordOTP = randomOTP;
// 	user.resetPasswordExpires = Date.now() + 600000; // 10 mins

// 	await user.save();

// 	const isSent = email
// 	  ? await sendEmailOtp(email, randomOTP)
// 	  : await sendOtp(phone, randomOTP);

// 	if (!isSent) {
// 	  return res.status(400).json({
// 		success: false,
// 		message: "Error sending OTP",
// 	  });
// 	}

// 	res.status(200).json({
// 	  success: true,
// 	  message: `OTP sent to your ${phone ? "phone" : "email"}`,
// 	});
//   } catch (error) {
// 	console.error(error);
// 	res.status(500).json({
// 	  success: false,
// 	  message: "Internal server error",
// 	});
//   }
// };

// // Verify OTP
// export const verifyOtp = async (req, res) => {
//   const { contact, otp } = req.body;

//   if (!contact || !otp) {
// 	return res.status(400).json({
// 	  success: false,
// 	  message: "Please enter all the fields",
// 	});
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^[0-9]{10}$/;

//   let email, phone;

//   if (emailRegex.test(contact)) {
// 	email = contact;
//   } else if (phoneRegex.test(contact)) {
// 	phone = contact;
//   } else {
// 	return res.status(400).json({
// 	  success: false,
// 	  message: "Invalid phone number or email",
// 	});
//   }

//   try {
// 	const user = await userModel.findOne(email ? { email } : { phone });

// 	if (
// 	  !user ||
// 	  user.resetPasswordOTP !== parseInt(otp) ||
// 	  user.resetPasswordExpires < Date.now()
// 	) {
// 	  return res.status(400).json({
// 		success: false,
// 		message: "Invalid or expired OTP",
// 	  });
// 	}

// 	user.resetPasswordOTP = null;
// 	user.resetPasswordExpires = null;
// 	await user.save();

// 	res.status(200).json({
// 	  success: true,
// 	  message: "OTP verified successfully",
// 	});
//   } catch (error) {
// 	console.error(error);
// 	res.status(500).json({
// 	  success: false,
// 	  message: "Internal server error",
// 	});
//   }
// };


// // reset password
// export const resetPassword = async (req, res) => {
// 	console.log(req.body);
  
// 	const { contact, otp, password } = req.body;
  
// 	if (!contact || !otp || !password) {
// 	  return res.status(400).json({
// 		success: false,
// 		message: "Please enter all the fields",
// 	  });
// 	}
  
// 	// Regular expressions for validation
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	const phoneRegex = /^[0-9]{10}$/;
  
// 	let email, phone;
  
// 	if (emailRegex.test(contact)) {
// 	  email = contact;
// 	} else if (phoneRegex.test(contact)) {
// 	  phone = contact;
// 	} else {
// 	  return res.status(400).json({
// 		success: false,
// 		message: "Invalid phone number or email",
// 	  });
// 	}
  
// 	try {
// 	  let user;
// 	  if (phone) {
// 		user = await userModel.findOne({ phone });
// 	  } else if (email) {
// 		user = await userModel.findOne({ email });
// 	  }
  
// 	  if (!user) {
// 		return res.status(404).json({
// 		  success: false,
// 		  message: "User not found",
// 		});
// 	  }
  
// 	  // Check OTP validity
// 	  if (
// 		user.resetPasswordOTP !== parseInt(otp) ||
// 		user.resetPasswordExpires < Date.now()
// 	  ) {
// 		return res.status(400).json({
// 		  success: false,
// 		  message: "Invalid or expired OTP",
// 		});
// 	  }
  
// 	  const randomsalt = await bcrypt.genSalt(10);
// 	  const hashedPassword = await bcrypt.hash(password, randomsalt);
  
// 	  // Update the user's password
// 	  user.password = hashedPassword;
// 	  user.resetPasswordOTP = null;
// 	  user.resetPasswordExpires = null;
// 	  await user.save();
  
// 	  res.status(200).json({
// 		success: true,
// 		message: "Password reset successfully",
// 	  });
// 	} catch (error) {
// 	  console.error(error);
// 	  return res.status(500).json({
// 		success: false,
// 		message: "Internal server error",
// 	  });
// 	}
//   };
  