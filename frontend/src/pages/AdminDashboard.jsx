import { useEffect, useState } from "react";
import { Trash2, PlusCircle, Users, IndianRupee, BookOpen, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { useCourseStore } from "../stores/useCourseStore";

const emptyCourse = {
  title: "", description: "", level: "entry", price: "", durationMonths: "", image: "", mode: "online", features: "",
};

const AdminDashboard = ({ superAdmin = false }) => {
  const [tab, setTab] = useState("courses");
  const { courses, fetchCourses, createCourse, deleteCourse } = useCourseStore();
  const [form, setForm] = useState(emptyCourse);
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState({ payments: [], revenue: 0 });
  const [admins, setAdmins] = useState([]);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", phone: "", password: "" });

  useEffect(() => {
    fetchCourses();
    axios.get("/admin/students").then((r) => setStudents(r.data)).catch(() => {});
    axios.get("/admin/payments").then((r) => setPayments(r.data)).catch(() => {});
    if (superAdmin) axios.get("/admin/admins").then((r) => setAdmins(r.data)).catch(() => {});
  }, [fetchCourses, superAdmin]);

  const handleCourse = async (e) => {
    e.preventDefault();
    const ok = await createCourse({
      ...form,
      price: Number(form.price),
      durationMonths: Number(form.durationMonths),
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
    });
    if (ok) setForm(emptyCourse);
  };

  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/admin/admins", adminForm);
      setAdmins([...admins, res.data]);
      setAdminForm({ name: "", email: "", phone: "", password: "" });
      toast.success("Admin created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const removeAdmin = async (id) => {
    await axios.delete(`/admin/admins/${id}`);
    setAdmins(admins.filter((a) => a._id !== id));
    toast.success("Admin removed");
  };

  const tabs = [
    { key: "courses", label: "Courses", icon: BookOpen },
    { key: "students", label: "Students", icon: Users },
    { key: "payments", label: "Payments", icon: IndianRupee },
    ...(superAdmin ? [{ key: "admins", label: "Admins", icon: ShieldCheck }] : []),
  ];

  const input = "border rounded-md px-3 py-2 text-sm focus:outline-orange-500";

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{superAdmin ? "Super Admin" : "Admin"} <span className="text-orange-500">Dashboard</span></h1>

      <div className="flex gap-2 mt-6 flex-wrap">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-md text-sm border ${tab === key ? "bg-orange-500 text-white border-orange-500" : "bg-white"}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {tab === "courses" && (
        <section className="mt-6 grid lg:grid-cols-2 gap-8">
          <form onSubmit={handleCourse} className="border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold flex items-center gap-2"><PlusCircle size={18} /> Add Course</h2>
            <input className={`${input} w-full`} placeholder="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea className={`${input} w-full`} placeholder="Description" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <select className={input} value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                <option value="entry">Entry level</option>
                <option value="medium">Medium level</option>
                <option value="advanced">Advanced level</option>
              </select>
              <select className={input} value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              <input className={input} type="number" placeholder="Price (INR)" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input className={input} type="number" placeholder="Duration (months)" required value={form.durationMonths} onChange={(e) => setForm({ ...form, durationMonths: e.target.value })} />
            </div>
            <input className={`${input} w-full`} placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input className={`${input} w-full`} placeholder="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600">Create Course</button>
          </form>

          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c._id} className="border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-xs text-gray-500 capitalize">{c.level} · ₹{c.price} · {c.durationMonths} months</p>
                </div>
                <button onClick={() => deleteCourse(c._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "students" && (
        <div className="mt-6 border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Courses</th></tr></thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.enrolledCourses.map((e) => e.course?.title).join(", ") || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "payments" && (
        <div className="mt-6">
          <p className="mb-3 font-semibold">Total revenue: <span className="text-orange-500">₹{payments.revenue}</span></p>
          <div className="border rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left"><tr><th className="p-3">Student</th><th className="p-3">Course</th><th className="p-3">Amount</th><th className="p-3">Date</th></tr></thead>
              <tbody>
                {payments.payments.map((p) => (
                  <tr key={p._id} className="border-t">
                    <td className="p-3">{p.user?.name}</td>
                    <td className="p-3">{p.course?.title}</td>
                    <td className="p-3">₹{p.amount}</td>
                    <td className="p-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "admins" && superAdmin && (
        <section className="mt-6 grid lg:grid-cols-2 gap-8">
          <form onSubmit={handleAdmin} className="border rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Create Admin</h2>
            {["name", "email", "phone", "password"].map((f) => (
              <input
                key={f} className={`${input} w-full`} placeholder={f[0].toUpperCase() + f.slice(1)}
                type={f === "password" ? "password" : "text"} required={f !== "phone"}
                value={adminForm[f]} onChange={(e) => setAdminForm({ ...adminForm, [f]: e.target.value })}
              />
            ))}
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600">Create Admin</button>
          </form>
          <div className="space-y-3">
            {admins.map((a) => (
              <div key={a._id} className="border rounded-xl p-4 flex items-center justify-between">
                <div><p className="font-semibold">{a.name}</p><p className="text-xs text-gray-500">{a.email}</p></div>
                <button onClick={() => removeAdmin(a._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default AdminDashboard;
