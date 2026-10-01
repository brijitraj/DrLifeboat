import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCard from "../components/CourseCard";
import { useCourseStore } from "../stores/useCourseStore";

const tabs = [
  { key: "all", label: "All" },
  { key: "entry", label: "Entry Level" },
  { key: "medium", label: "Medium Level" },
  { key: "advanced", label: "Advanced Level" },
];

const CoursesPage = () => {
  const [level, setLevel] = useState("all");
  const { courses, loading, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses(level);
  }, [level, fetchCourses]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center">Our <span className="text-orange-500">Courses</span></h1>
      <p className="text-center text-sm text-gray-600 mt-2">Pick your level and subscribe — access lasts for the course duration.</p>

      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setLevel(t.key)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              level === t.key ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 hover:border-orange-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-500">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No courses in this level yet.</p>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {courses.map((c) => <CourseCard key={c._id} course={c} />)}
        </motion.div>
      )}
    </main>
  );
};

export default CoursesPage;
