import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/router.js";
import path from "path";

// Import database connection
import connect from "./database/conn.js";

const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());
config();

// Application port
const port = process.env.PORT || 1011;

// Define static file path
const __dirname1 = path.resolve();

// Routes
app.use("/api", router); // API routes

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1, "../client/build", "index.html"));
  });
}

// Connect to the database and start server
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
