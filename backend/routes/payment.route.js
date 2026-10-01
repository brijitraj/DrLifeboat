import express from "express";
import { createOrder, verifyPayment, getMyPayments } from "../controllers/payment.controller.js";
import { protectRoute, studentRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-order", protectRoute, studentRoute, createOrder);
router.post("/verify", protectRoute, studentRoute, verifyPayment);
router.get("/my", protectRoute, studentRoute, getMyPayments);

export default router;
