import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ["entry", "medium", "advanced"], required: true },
    price: { type: Number, required: true }, // INR
    durationMonths: { type: Number, required: true }, // subscription length
    image: { type: String },
    mode: { type: String, enum: ["offline", "online"], default: "online" },
    features: [String],
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
