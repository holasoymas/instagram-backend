import Post from "../models/postsModel.js";
import User from "../models/userModel.js";
import { uploadImageToCloudinary } from "../services/cloudinaryService.js";

export const createPost = async (req, res) => {
  const user = req.user;
  // console.log(req.body);

  try {
    console.log("Create post " + req.file);
    const { caption } = req.body;

    let uploadRes;
    try {
      uploadRes = await uploadImageToCloudinary(req.file);

    } catch (error) {
      console.error("Error while uploading file", error);
      return res.status(500).json({ msg: "error while uplading" });
    }

    const image = uploadRes.secure_url;

    const newPost = new Post({
      userId: user._id,
      caption,
      image
    })

    // Save the post to the database
    await newPost.save();

    // Update the User model to include the new post's ID in the posts array
    await User.findByIdAndUpdate(user._id, { $push: { posts: newPost._id } });
    // { $push: { posts: { $each: [newPost._id], $position: 0 } } }

    return res.status(201).json(newPost);
  } catch (err) {
    console.error("Something went wrong ", err);
    return res.status(500).json({ msg: "error while creating a post" });
  }
}
