import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if header starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Extract token by removing the word "Bearer "
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token signature using our secret key!
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find user in database and attach to req.user (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      // 4. Pass control to the next handler!
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized, token failed or expired",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token provided in headers",
    });
  }
};
