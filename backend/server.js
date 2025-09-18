const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// 👇 This line is VERY IMPORTANT
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
