import express from "express";

import { uploadImage } from "../controllers/imageUploadControllers.js";
import { uploadImageMiddleware } from "../middleware/uploadImageMiddleware.js";

const userProfileRoute = express.Router();
userProfileRoute.post("/upload-profile", uploadImageMiddleware, uploadImage);

export default userProfileRoute;
