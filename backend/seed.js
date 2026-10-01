import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/user.model.js";
import Course from "./models/course.model.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.SUPER_ADMIN_EMAIL;
  if (!(await User.findOne({ email }))) {
    await User.create({
      name: "Super Admin",
      email,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: "superAdmin",
    });
    console.log("SuperAdmin created:", email);
  }

  if ((await Course.countDocuments()) === 0) {
    await Course.insertMany([
      {
        title: "AMC Foundation Course",
        description: "Start from the basics: core concepts, exam pattern and high-yield topics for AMC Part 1 (MCQ).",
        level: "entry",
        price: 4999,
        durationMonths: 3,
        mode: "online",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
        features: ["Core concept classes", "Basic Qbank access", "Weekly doubt session"],
      },
      {
        title: "AMC MCQ Offline Course",
        description: "Structured classroom program with recalls, weekly assessments and expert mentorship.",
        level: "medium",
        price: 14999,
        durationMonths: 5,
        mode: "offline",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600",
        features: ["4 expert-led classes per week", "Recalls and Qbanks", "Weekly assessments"],
      },
      {
        title: "AMC / PLAB Advanced Mastery",
        description: "Intensive high-yield revision, adaptive mock tests and 1:1 performance analytics.",
        level: "advanced",
        price: 24999,
        durationMonths: 6,
        mode: "online",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600",
        features: ["AI adaptive mock tests", "1:1 mentorship", "Full exam simulation"],
      },
    ]);
    console.log("Sample courses added");
  }

  await mongoose.disconnect();
  console.log("Seeding done");
};

run();
