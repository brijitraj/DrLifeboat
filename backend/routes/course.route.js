import express from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", protectRoute, adminRoute, createCourse);
router.put("/:id", protectRoute, adminRoute, updateCourse);
router.delete("/:id", protectRoute, adminRoute, deleteCourse);

export default router;
