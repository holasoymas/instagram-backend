import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  caption: {
    type: String,
  },
  image: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }],
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    comment: {
      type: String,
    },
  }],
  created_at: { type: Date, default: Date.now(), index: true },
})

const Post = mongoose.model("Post", postSchema);

export default Post;
