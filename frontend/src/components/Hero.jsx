import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        Plan Your <span className="text-orange-500">Medical Career In Australia</span> – Let's Make It Happen
      </h1>
      <p className="mt-4 text-gray-600">Everything you need – and more... for AMC Examinations.</p>
      <p className="mt-2 text-xs italic text-gray-500">
        Experience unmatched AMC exam preparation with <span className="text-orange-500">Dr. Lifeboat.</span>
      </p>
      <Link
        to="/courses"
        className="inline-block mt-6 bg-orange-500 text-white px-5 py-2.5 rounded-md hover:bg-orange-600"
      >
        Start Learning Now
      </Link>
    </motion.div>
    <motion.img
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700"
      alt="Medical team"
      className="rounded-xl shadow-lg w-full object-cover max-h-80"
    />
  </section>
);

export default Hero;
