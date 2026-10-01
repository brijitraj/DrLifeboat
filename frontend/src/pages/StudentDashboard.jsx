import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Receipt } from "lucide-react";
import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";

const StudentDashboard = () => {
  const { user } = useUserStore();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("/payments/my").then((res) => setPayments(res.data)).catch(() => {});
  }, []);

  const subs = user?.enrolledCourses || [];
  const now = new Date();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Welcome, <span className="text-orange-500">{user?.name}</span></h1>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 font-semibold mb-3"><BookOpen size={18} /> My Subscriptions</h2>
        {subs.length === 0 ? (
          <p className="text-sm text-gray-500">
            No active subscriptions. <Link to="/courses" className="text-orange-500 underline">Browse courses</Link>
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {subs.map((s, i) => {
              const active = new Date(s.expiresAt) > now;
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border rounded-xl p-4 bg-white">
                  <h3 className="font-semibold">{s.course?.title}</h3>
                  <p className="text-xs capitalize text-gray-500">{s.course?.level} level</p>
                  <p className="text-sm mt-2">Expires: {new Date(s.expiresAt).toLocaleDateString()}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {active ? "Active" : "Expired"}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-semibold mb-3"><Receipt size={18} /> Payment History</h2>
        <div className="border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr><th className="p-3">Course</th><th className="p-3">Amount</th><th className="p-3">Date</th></tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">{p.course?.title}</td>
                  <td className="p-3">₹{p.amount}</td>
                  <td className="p-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {payments.length === 0 && <tr><td colSpan="3" className="p-3 text-gray-500">No payments yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default StudentDashboard;
