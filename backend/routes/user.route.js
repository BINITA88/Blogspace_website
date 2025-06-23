import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile } from "../controllers/user.controller.js";
import {forgetPassword,resetPassword  } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);
router.post("/forgetpassword",forgetPassword)
router.put("/resetpassword/:token", resetPassword)
router.put("/profile", protectRoute, updateProfile);

export default router;
// import express from "express";
// import { createUser,getSuggestedConnections, getPublicProfile, updateProfile, forgotPassword, loginUser, resetPassword, verifyOtp } from "../controllers/user.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Create a new user
// router.post("/create", createUser);

// // Login users
// router.post("/login", loginUser);

// router.get("/suggestions", protectRoute, getSuggestedConnections);
// router.get("/:username", protectRoute, getPublicProfile);

// router.put("/profile", protectRoute, updateProfile);
// // Forgot password
// router.post("/forgot_password", forgotPassword);

// // Reset password
// router.post("/reset_password", resetPassword );

// // Verify OTP
// router.post("/verify_otp", verifyOtp);

// // // Single user
// // router.get("/get_single_user", protectRoute, userController.getSingleUser);

// // // Get all users
// // router.get("/get_all_users", protectRoute, userController.getAllUsers);

// // // Search users
// // router.get("/search_users", userController.searchUsers);

// // // Update profile picture
// // router.post("/profile_picture", protectRoute, userController.uploadProfilePicture);

// // // Update user
// // router.put("/update", protectRoute, userController.editUserProfile);

// // // Get unrequested users
// // router.get("/get_unrequested_users", protectRoute, userController.getUnrequestedUsers);

// // // Login with Google
// // router.post("/google", userController.googleLogin);
// // router.post("/getGoogleUser", userController.getUserByGoogleEmail);

// // // Cover photo routes
// // router.post("/upload_cover", protectRoute, userController.uploadCoverPhoto);
// // router.put("/edit_cover", protectRoute, userController.editCoverPhoto);
// // router.delete("/delete_cover", protectRoute, userController.deleteCoverPhoto);
// // router.get("/fetch", protectRoute, userController.fetchCoverPhoto);

// export default router;
