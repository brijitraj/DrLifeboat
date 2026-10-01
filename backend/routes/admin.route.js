import express from "express";
import {
  getStudents,
  getAllPayments,
  getAdmins,
  createAdmin,
  deleteAdmin,
} from "../controllers/admin.controller.js";
import { protectRoute, adminRoute, superAdminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/students", protectRoute, adminRoute, getStudents);
router.get("/payments", protectRoute, adminRoute, getAllPayments);

router.get("/admins", protectRoute, superAdminRoute, getAdmins);
router.post("/admins", protectRoute, superAdminRoute, createAdmin);
router.delete("/admins/:id", protectRoute, superAdminRoute, deleteAdmin);

export default router;
