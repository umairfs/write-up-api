const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");

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

    const user = new User(reqBody);
    await user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send("error: " + JSON.stringify(error));
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
