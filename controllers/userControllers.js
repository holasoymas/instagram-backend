import Post from "../models/postsModel.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/tokensUtils.js";

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

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("hello login route");
  console.log(username + password);
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User not found" });
    console.log("THis is user", user);
    if (user.password !== password) {
      return res.status(401).json({ msg: "Invalid Credintials" });
    }

    const payload = { username, password };
    const token = generateToken(payload);
    // Fix this
    console.log(user);
    console.log(token);
    return res.status(200).json({ user, token });

  } catch (err) {
    console.error("Something wrong with the server " + err);
  }
}

export const getUser = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username }).populate("posts");
    if (!user) return res.status(404).json({ msg: "User not found" });
    // Add a flag to indicate whether the authenticated user is the profile owner
    const isOwner = req.isOwner;

    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ msg: "Unauthenticated user" });
    }

    // Include the isOwner flag in the response data if the user is authorized or not 
    return res.status(200).send({ user, isOwner });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const randomPosts = await Post.aggregate([{ $sample: { size: 5 } }]);
    return res.status(200).json(randomPosts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
}


