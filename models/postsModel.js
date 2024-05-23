import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  caption: {
    type: String,
    required:true
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
