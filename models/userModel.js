import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 3
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 3
  },
  username: {
    type: String,
    require: true,
    unique: true,
    minLength: 3,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-Binary'],
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  profilePic: {
    type: String
  },
  bio: {
    type: String,
  },
  followers: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }],
  following: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }],
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref: "Post"
  }],
  password: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("User", userSchema);

export default User;



