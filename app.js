import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
const PORT = process.env.PORT || 5000;
import cors from "cors";
import userProfileRoute from "./routes/userProfileRoute.js";
import userRoute from "./routes/userRoutes.js";

const app = express();


connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.use("/", userProfileRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
