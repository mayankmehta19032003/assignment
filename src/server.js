import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import personRoutes from "./routes/person.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/person", personRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/personDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
