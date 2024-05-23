import express from 'express'
const postRoute = express.Router();
import { createPost } from '../controllers/postControllers.js';
import { authenticationMiddleware, authorizationMiddleware } from '../middleware/authMiddleware.js';
import { uploadImageMiddleware } from '../middleware/uploadImageMiddleware.js';

postRoute.post("/", uploadImageMiddleware,authenticationMiddleware, authorizationMiddleware, createPost);

export default postRoute;
