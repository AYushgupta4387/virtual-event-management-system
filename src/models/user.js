import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  relatedIds: [
    // Here we add an array of ObjectIds
    {
      type: mongoose.Schema.Types.ObjectId, // This ensures each item in the array is a valid MongoDB ObjectId
    },
  ],
});

const User = mongoose.model("Users", userSchema);
export default User;
