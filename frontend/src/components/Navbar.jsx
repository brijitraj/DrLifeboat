import { Link, useNavigate } from "react-router-dom";
import { LifeBuoy, LogOut, LayoutDashboard } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

export const dashboardPath = (role) =>
  role === "superAdmin" ? "/super-admin" : role === "admin" ? "/admin" : "/dashboard";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <LifeBuoy className="text-orange-500" /> Dr. <span className="text-orange-500">Lifeboat</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <a href="/#about" className="hover:text-orange-500">About Us</a>
          <Link to="/courses" className="hover:text-orange-500">Courses</Link>
          <a href="/#contact" className="hover:text-orange-500">Contact</a>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <Link
                to={dashboardPath(user.role)}
                className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600"
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-orange-500">Login</Link>
              <Link to="/signup" className="bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600">
                Enrol Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
