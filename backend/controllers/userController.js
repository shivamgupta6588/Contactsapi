import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // Check if email, name, and password are provided
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please enter all the values" });
    return; // Return to prevent further execution
  }

  // Check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({ error: "User already exists" });
    return; // Return to prevent further execution
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    // If user is created successfully, respond with user data
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    // If user creation failed, respond with 500 status code
    res.status(500).json({ error: "User creation failed" });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400).json({ error: "Please enter all the values" });
    return; // Return to prevent further execution
  }

  // Find user by email
  const userExist = await User.findOne({ email });

  // Check if user exists
  if (!userExist) {
    res.status(400).json({ error: "User doesn't exist" });
    return; // Return to prevent further execution
  }

  // Compare passwords
  const isPasswordMatch = await bcrypt.compare(password, userExist.password);

  if (isPasswordMatch) {
    // If password matches, respond with user's email
    // res.status(200).json({ _id: userExist.id, email: userExist.email });

    const token = jwt.sign(
      {
        user: {
          id: userExist.id,
          email: userExist.email,
          name: userExist.name,
        },
      },
      process.env.JWT_SECRETKEY
    );
    res.cookie("access_token", token);
    res.status(200).json(token);
  } else {
    // If password doesn't match, respond with error
    res.status(400).json({ error: "Incorrect password" });
  }
});
