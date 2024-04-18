import express from 'express';
import { createUser, getUser } from "../controllers/userControllers.js";
const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/:username", getUser);

export default userRoute;
