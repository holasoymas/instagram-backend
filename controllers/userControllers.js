import User from "../models/userModel.js";
import { getTokenFrom } from "../utils/formatAuthHeader.js";
import { generateToken, verifyToken } from "../utils/tokensUtils.js";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, gender, birthday, profilePic, password, repeatPassword } = req.body;
    console.log(req.body);
    if (password !== repeatPassword) {
      console.log("Pass must be same with repeat pass")
      return res.status(400).json({ msg: "Password must match with Repeate Password field " })
    }
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      gender,
      birthday,
      password,
      profilePic
    });

    const payload = { username, email };
    const token = generateToken(payload);

    const saveNewUser = await newUser.save();
    return res.json({ msg: "User save successfully", data: saveNewUser, token });
  } catch (err) {
    console.error(err);
    throw new Error("Error while user entry ", err.message);
  }
}

export const getUser = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Get token from request
    const decodedToken = getTokenFrom(req);
    console.log(decodedToken);
    // Verify token and get user information
    const validUser = verifyToken(decodedToken);
    console.log(validUser);
    // Check if user is authenticated
    if (!validUser) {
      return res.status(401).json({ msg: "Unauthenticated user" });
    }

    // Check if the authenticated user is the owner of the profile
    if (validUser.username !== username) {
      console.log("got this part");
      return res.status(403).json({ user, msg: "Unauthorized user" });
    }

    // Add a flag to indicate whether the authenticated user is the profile owner
    const isOwner = true;

    // Include the isOwner flag in the response data
    return res.status(200).send({ user, isOwner });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

