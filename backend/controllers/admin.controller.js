import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .populate("enrolledCourses.course", "title level");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "paid" })
      .populate("user", "name email")
      .populate("course", "title level")
      .sort({ createdAt: -1 });
    const revenue = payments.reduce((sum, p) => sum + p.amount, 0);
    res.json({ payments, revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- superAdmin only ----
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already exists" });
    const admin = await User.create({ name, email, phone, password, role: "admin" });
    res.status(201).json({ _id: admin._id, name: admin.name, email: admin.email, role: admin.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id, role: "admin" });
    res.json({ message: "Admin removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
