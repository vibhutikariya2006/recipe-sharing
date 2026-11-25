const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
require("./src/config/env");

const authRoutes = require("./src/routes/authRoutes");
const recipeRoutes = require("./src/routes/recipeRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

connectDB()


app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comment", commentRoutes);

app.get("/", (req, res) => {
  res.send("Recipe Sharing App's Backend is running!");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});