import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  created_at: { type: Date, default: Date.now, index: true }
})

const LikeModel = mongoose.model("Like", likesSchema);

export default LikeModel;
