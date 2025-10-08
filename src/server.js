const express = require("express");
const connectDB = require("./config/database.js");
const userRoutes = require("./routes/userRoutes"); // Import routes

let app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/user", async (req, res) => {
//   let { email } = req.query;

//   try {
//     let user = await UserModel.find({ emailId: email });
//     if (!user.length) {
//       res.status(404).send("User Not Found");
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("error: " + JSON.stringify(err));
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     let user = await UserModel.find({});
//     if (!user.length) {
//       res.status(404).send("No User Registered");
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("error: " + JSON.stringify(err));
//   }
// });

// app.delete("/user", async (req, res) => {
//   let { userId } = req.query;
//   try {
//     let user = await UserModel.findOneAndDelete(userId);
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("error: " + JSON.stringify(err));
//   }
// });

// ------------------ MONGODB CONNECTION ------------------
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api/users", userRoutes);

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
