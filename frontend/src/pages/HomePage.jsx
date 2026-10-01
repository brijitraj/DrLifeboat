import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, BarChart3, Brain, Target } from "lucide-react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { useCourseStore } from "../stores/useCourseStore";

const offers = [
  { icon: GraduationCap, title: "Expert Faculty", text: "Learn from highly experienced doctors who specialize in AMC/PLAB exam content and strategy.", color: "bg-sky-100" },
  { icon: BookOpen, title: "Concept-based & High-Yield Content", text: "Curriculum based on recurring themes and recall questions from previous AMC exams.", color: "bg-orange-100" },
  { icon: Users, title: "Interactive Learning", text: "Face-to-face interaction with experienced mentors, Q&A sessions and concept-based lectures.", color: "bg-yellow-100" },
  { icon: Target, title: "Student Portal", text: "A secure, personalised dashboard to track your progress and access exclusive resources.", color: "bg-purple-100" },
  { icon: BarChart3, title: "Comprehensive Qbanks & Recalls", text: "A vast library of AMC/PLAB-style MCQs, past-year recalls and mock exams with detailed explanations.", color: "bg-gray-100" },
  { icon: Brain, title: "Weekly Assessments & Progress Tracking", text: "Regular tests, structured study plans and performance analytics to keep you on track.", color: "bg-green-100" },
];

const HomePage = () => {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <main>
      <Hero />

      <div className="bg-orange-500 text-white text-sm py-2 overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="inline-block"
        >
          New batch starting in SEPTEMBER 2025 | 15 slots per batch | Call Us: +91 93 44 28 87 49 | AMC Exam Preparation Course | Offline Classroom
        </motion.div>
      </div>

      <section id="about" className="max-w-4xl mx-auto px-4 py-14 text-center">
        <h2 className="text-2xl font-bold">About <span className="text-orange-500">Us</span></h2>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          Dr. Lifeboat is an internationally trained medical graduate with vast teaching experience in AMC, PLAB and FMGE pathways.
          With a strong understanding of exam psychology, pattern trends and student struggles, Dr. Lifeboat has mentored hundreds of
          students to success. Our goal is to rescue committed students from cycles of repeated failure and guide them to their final
          destination — SUCCESS.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center">What We <span className="text-orange-500">Offer</span></h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {offers.map(({ icon: Icon, title, text, color }) => (
            <motion.div key={title} whileHover={{ scale: 1.03 }} className={`${color} rounded-xl p-5`}>
              <Icon className="text-gray-700" />
              <h3 className="font-semibold mt-2">{title}</h3>
              <p className="text-xs text-gray-600 mt-1">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Our <span className="text-orange-500">Courses</span></h2>
          <Link to="/courses" className="text-sm text-orange-500 hover:underline">View all</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {courses.slice(0, 3).map((c) => <CourseCard key={c._id} course={c} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl text-white p-10 text-center">
          <h2 className="text-2xl font-bold">AI-Based Adaptive Learning Mock Test — Free</h2>
          <p className="mt-2 text-sm">All enrolled students get free access to an AI-powered adaptive mock test designed to mimic the real AMC Part 1 exam.</p>
          <Link to="/courses" className="inline-block mt-5 bg-white text-orange-600 font-semibold px-5 py-2 rounded-md">
            Enrol Today
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
