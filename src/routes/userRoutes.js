const express = require("express");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// ---------------- SIGNUP API ----------------
router.post("/signup", async (req, res) => {
  const reqBody = req.body;

  if (
    !reqBody.firstName ||
    !reqBody.lastName ||
    !reqBody.email ||
    !reqBody.password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email: reqBody.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving
    const saltRounds = 10; // reasonable default
    const hashedPassword = await bcrypt.hash(reqBody.password, saltRounds);

    // Build user object with hashed password (do NOT store plaintext)
    const userPayload = {
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      email: reqBody.email,
      password: hashedPassword,
      role: reqBody.role || "user"
    };

    const user = new User(userPayload);
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// --------------- LOGIN API -----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password (assuming hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// --------------- LOGOUT API ----------------
router.post("/logout", (req, res) => {
  try {
    // (Optional) If using cookies for auth, clear it:
    // res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
});

// ---------------- GET ALL USERS API ----------------
// router.get("/all", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json({ success: true, data: users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

module.exports = router;
