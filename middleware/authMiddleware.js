import pkg from "jsonwebtoken";
const { TokenExpiredError } = pkg;
import User from "../models/userModel.js";
import { getTokenFrom } from "../utils/formatAuthHeader.js"
import { verifyToken } from "../utils/tokensUtils.js";

export const authenticationMiddleware = async (req, res, next) => {
  // console.log("Auth midd " + req.file);
  try {
    const token = getTokenFrom(req);
    if (!token) return res.status(401).json({ msg: "Unauthenticated user" });

    const decodedUser = verifyToken(token);
    if (!decodedUser) return res.status(401).json({ msg: "Unauthenticated user" });

    const user = await User.findOne({ username: decodedUser.username });
    if (!user) return res.sendStatus(404).json({ msg: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ msg: "Token expired" });
    }
    console.error("Error while authenticating ", err);
    return res.sendStatus(401);
  }
}

export const authorizationMiddleware = async (req, res, next) => {
  const username = req.params.username;
  try {
    if (req.user.username !== username) req.isOwner = false;
    if (req.user.username === username) req.isOwner = true;
    next();
  } catch (err) {
    console.error("Error in server ", err);
    return res.sendStatus(500);
  }
}
