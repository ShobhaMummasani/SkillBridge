import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Internship",
    description: "",
    skills: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/jobs", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not post job");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Post a job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Job title" value={form.title} onChange={handleChange} className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" required />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" required />
        <input name="location" placeholder="Location (e.g. Remote, Chennai)" value={form.location} onChange={handleChange} className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" required />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20">
          <option>Internship</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
        </select>
        <textarea name="description" placeholder="Job description" value={form.description} onChange={handleChange} className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 h-32 dark:bg-ink-light dark:border-paper/20" required />
        <input name="skills" placeholder="Skills, comma separated (e.g. React, Node.js)" value={form.skills} onChange={handleChange} className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-gold text-ink px-4 py-2 rounded">Post job</button>
      </form>
    </div>
  );
}
