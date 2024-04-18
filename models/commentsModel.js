import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now, index: true }
})

const CommentsModel = mongoose.model("Comment", commentsSchema);

export default CommentsModel;
