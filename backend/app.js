import express from "express";
import { signup, loginUser } from "./authcontroller.js";
import cors from "cors";
import { imageController } from "./imagecontroller.js";
import { enforceAuth } from "./auth.js";
import "dotenv/config";

const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.post("/api/signup", signup);
app.post("/api/login", loginUser);
app.post("/api/image", imageController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
