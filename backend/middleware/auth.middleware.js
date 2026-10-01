import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const studentRoute = (req, res, next) =>
  req.user?.role === "student" ? next() : res.status(403).json({ message: "Students only" });

export const adminRoute = (req, res, next) =>
  ["admin", "superAdmin"].includes(req.user?.role)
    ? next()
    : res.status(403).json({ message: "Admin access only" });

export const superAdminRoute = (req, res, next) =>
  req.user?.role === "superAdmin"
    ? next()
    : res.status(403).json({ message: "Super admin access only" });
