import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const validateUser = asyncHandler(async (req, res, next) => {
  // Retrieve the token from the request cookie
  const token = req.cookies.access_token;

  // Verify the token and extract user information
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Check if decoded contains user information
    if (!decoded || !decoded.user || !decoded.user.id) {
      throw new Error("Invalid token");
    }

    // Set req.currentUser to the user information from the token
    req.currentUser = decoded.user;

    next();
  } catch (error) {
    // Handle token verification errors
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
});
