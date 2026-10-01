import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signup(form);
    if (user) navigate("/dashboard");
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Full name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "tel", placeholder: "Phone number" },
    { name: "password", type: "password", placeholder: "Password (min 6 characters)" },
    { name: "confirmPassword", type: "password", placeholder: "Confirm password" },
  ];

  return (
    <div className="flex justify-center py-16 px-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Student Sign Up</h2>
        {fields.map((f) => (
          <input
            key={f.name} {...f} required={f.name !== "phone"} value={form[f.name]} onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-orange-500"
          />
        ))}
        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 disabled:opacity-60"
        >
          <UserPlus size={16} /> {loading ? "Creating..." : "Sign Up"}
        </button>
        <p className="text-sm text-center text-gray-600">
          Already registered? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default SignUpPage;
