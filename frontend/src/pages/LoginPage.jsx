import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { dashboardPath } from "../components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) navigate(dashboardPath(user.role));
  };

  return (
    <div className="flex justify-center py-16 px-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-xs text-center text-gray-500">Student, Admin and Super Admin can all sign in here.</p>

        <div className="relative">
          <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email" required placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-orange-500"
          />
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password" required placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-orange-500"
          />
        </div>

        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 disabled:opacity-60"
        >
          <LogIn size={16} /> {loading ? "Signing in..." : "Login"}
        </button>
        <p className="text-sm text-center text-gray-600">
          New student? <Link to="/signup" className="text-orange-500 hover:underline">Create an account</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
