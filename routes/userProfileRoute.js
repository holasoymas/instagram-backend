import express from "express";

import { uploadImage } from "../controllers/imageUploadControllers.js";
import { uploadProfile } from "../middleware/uploadProfileMiddleware.js";

const userProfileRoute = express.Router();
userProfileRoute.post("/upload-profile", uploadProfile, uploadImage);

export default userProfileRoute;
