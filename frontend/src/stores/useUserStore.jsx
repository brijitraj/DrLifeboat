import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, phone, password, confirmPassword }) => {
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", { name, email, phone, password });
      set({ user: res.data, loading: false });
      toast.success("Account created");
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Signup failed");
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success("Welcome back");
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
    } finally {
      set({ user: null });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch {
      set({ user: null, checkingAuth: false });
    }
  },
}));
