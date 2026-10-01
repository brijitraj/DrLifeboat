import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useUserStore();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
