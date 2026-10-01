import { motion } from "framer-motion";
import { Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCourseStore } from "../stores/useCourseStore";

const levelStyle = {
  entry: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

const CourseCard = ({ course }) => {
  const { user, checkAuth } = useUserStore();
  const { buyCourse } = useCourseStore();
  const navigate = useNavigate();

  const enrolled = user?.enrolledCourses?.some(
    (e) => (e.course?._id || e.course) === course._id && new Date(e.expiresAt) > new Date()
  );

  const handleSubscribe = () => {
    if (!user) return navigate("/login");
    if (user.role !== "student") return;
    buyCourse(course, user, () => {
      checkAuth();
      navigate("/dashboard");
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col"
    >
      <img src={course.image} alt={course.title} className="h-40 w-full object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${levelStyle[course.level]}`}>
          {course.level} level
        </span>
        <h3 className="mt-2 font-bold">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{course.description}</p>

        <ul className="mt-3 space-y-1 text-xs text-gray-600">
          {course.features?.map((f) => (
            <li key={f} className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-green-500" /> {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
          <span className="flex items-center gap-1"><Clock size={14} /> {course.durationMonths} Months</span>
          <span className="flex items-center gap-1 capitalize"><MapPin size={14} /> {course.mode}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-bold">₹{course.price.toLocaleString("en-IN")}</span>
          {enrolled ? (
            <span className="text-sm text-green-600 font-semibold">Subscribed</span>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={user && user.role !== "student"}
              className="bg-orange-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-orange-600 disabled:bg-gray-300"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
