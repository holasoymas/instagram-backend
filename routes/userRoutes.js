import express from 'express';
import { createUser, getUser, loginUser } from "../controllers/userControllers.js";
import { authenticationMiddleware, authorizationMiddleware } from '../middleware/authMiddleware.js';
const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.post("/login", loginUser);
userRoute.get("/:username", authenticationMiddleware, authorizationMiddleware, getUser);

export default userRoute;
