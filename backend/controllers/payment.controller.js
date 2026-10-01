import crypto from "crypto";
import { razorpay } from "../lib/razorpay.js";
import Course from "../models/course.model.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";

// Step 1: create a Razorpay order
export const createOrder = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const order = await razorpay.orders.create({
      amount: course.price * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    await Payment.create({
      user: req.user._id,
      course: course._id,
      amount: course.price,
      razorpayOrderId: order.id,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      courseTitle: course.title,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Step 2: verify signature, then activate the subscription
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id }).populate("course");
    if (!payment) return res.status(404).json({ message: "Order not found" });
    if (payment.status === "paid") return res.json({ message: "Already verified", expiresAt: payment.expiresAt });

    if (expected !== razorpay_signature) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const startDate = new Date();
    const expiresAt = new Date(startDate);
    expiresAt.setMonth(expiresAt.getMonth() + payment.course.durationMonths);

    payment.status = "paid";
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.startDate = startDate;
    payment.expiresAt = expiresAt;
    await payment.save();

    await User.findByIdAndUpdate(payment.user, {
      $push: { enrolledCourses: { course: payment.course._id, startDate, expiresAt } },
    });

    res.json({ message: "Payment successful", expiresAt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id, status: "paid" })
      .populate("course", "title level image")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
