import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
      minLength: 4,
      maxLength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowerCase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: 8,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
