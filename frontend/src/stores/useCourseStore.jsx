import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const useCourseStore = create((set, get) => ({
  courses: [],
  loading: false,

  fetchCourses: async (level) => {
    set({ loading: true });
    try {
      const res = await axios.get("/courses", { params: level && level !== "all" ? { level } : {} });
      set({ courses: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to load courses");
    }
  },

  createCourse: async (data) => {
    try {
      const res = await axios.post("/courses", data);
      set((s) => ({ courses: [res.data, ...s.courses] }));
      toast.success("Course created");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  },

  deleteCourse: async (id) => {
    try {
      await axios.delete(`/courses/${id}`);
      set((s) => ({ courses: s.courses.filter((c) => c._id !== id) }));
      toast.success("Course deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  },

  // Razorpay subscription purchase
  buyCourse: async (course, user, onSuccess) => {
    const ok = await loadRazorpay();
    if (!ok) return toast.error("Could not load Razorpay. Check your internet.");

    try {
      const { data } = await axios.post("/payments/create-order", { courseId: course._id });

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Dr. Lifeboat",
        description: data.courseTitle,
        order_id: data.orderId,
        prefill: { name: user.name, email: user.email, contact: user.phone || "" },
        theme: { color: "#f97316" },
        handler: async (response) => {
          try {
            await axios.post("/payments/verify", response);
            toast.success("Payment successful! Course unlocked.");
            onSuccess?.();
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
      });
      rzp.on("payment.failed", () => toast.error("Payment failed"));
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not start payment");
    }
  },
}));
