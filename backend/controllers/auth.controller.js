



import User from "../models/user.model.js";
import Token from "../models/token.model.js";  // ✅ ADD THIS (create token.model.js if needed)
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";  // ✅ ADD THIS
import {  sendWelcomeEmail } from "../emails/emailHandlers.js";  // Assuming both exist
import sendEmail from '../utils/setEmail.js';  // if exported as default
// ------------------- SIGNUP ----------------------
export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });

    res.cookie("jwt-Blogspace", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User registered successfully" });

    const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;
    await sendWelcomeEmail(user.email, user.name, profileUrl);
  } catch (error) {
    console.log("Error in signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------- LOGIN ----------------------
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
    res.cookie("jwt-Blogspace", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- FORGET PASSWORD ----------------------
export const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Email not found in our system." });
    }

    const tokenString = crypto.randomBytes(16).toString("hex");
    const token = new Token({
      token: tokenString,
      userId: user._id,
    });
    await token.save();

    const resetUrl = `${process.env.FRONT_END_URL}/resetpassword/${token.token}`;

    const emailTemplate = `
      <html>
      <body>
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
      </body>
      </html>
    `;

    await sendEmail({
      from: "no-reply@Blogspace.com",
      to: user.email,
      subject: "Reset Your Password - Blogspace",
      html: emailTemplate,
    });

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forget password error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// ------------------- RESET PASSWORD ----------------------
export const resetPassword = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    const user = await User.findById(token.userId);
    if (!user) {
      return res.status(400).json({ error: "User not found for this token." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();

    await Token.deleteOne({ _id: token._id });

    res.json({ message: "Password has been reset successfully. Please log in." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// ------------------- LOGOUT ----------------------
export const logout = (req, res) => {
  res.clearCookie("jwt-Blogspace");
  res.json({ message: "Logged out successfully." });
};

// ------------------- GET CURRENT USER ----------------------
export const getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ------------------- USER LIST ----------------------
export const userList = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("User list error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
