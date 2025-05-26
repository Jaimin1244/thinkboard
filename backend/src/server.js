import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path'

import rateLimiter from "./middleware/rateLimiter.middleware.js";
import notesRoutes from "./routes/notes.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// midedleware
app.use(express.json());
app.use(rateLimiter);

//simple custom midedleware
// app.use((req, res, next) => {
//     console.log(`Req method is${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
});
