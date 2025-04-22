import mongoose from "mongoose";
import User from "../models/user.model.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //getting data from body
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error("All fields are required!");
      error.statusCode = 400;
      throw error;
    }

    //checking esisting user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exist");
      error.statusCode = 409;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      {
        session,
      }
    );

    //assigned a json web token to a user id
    const token = JWT.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User Created Succesfully",
      data: {
        token: token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Please provide both email and password.");
      error.statusCode = 400;
      throw error;
    }

    //check user exist
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not Found!");
      error.StatusCode = 404;
      throw error;
    }

    //check password
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const token = await JWT.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      seccess: true,
      message: "User logged In Successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};