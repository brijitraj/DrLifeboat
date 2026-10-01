import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const userData = (u) => ({
  _id: u._id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  role: u.role,
  enrolledCourses: u.enrolledCourses,
});

// Public signup always creates a student
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, phone, password, role: "student" });
    setCookie(res, generateToken(user._id));
    res.status(201).json(userData(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// One login for all three roles; the returned role decides the dashboard
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid email or password" });

    setCookie(res, generateToken(user._id));
    res.json(userData(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("enrolledCourses.course", "title level image");
  res.json(user);
};
