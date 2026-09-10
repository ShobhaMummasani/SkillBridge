import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password, role, company);
      navigate("/jobs");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <h1 className="text-2xl font-semibold mb-6">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1">
            <input type="radio" checked={role === "student"} onChange={() => setRole("student")} /> Student
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" checked={role === "recruiter"} onChange={() => setRole("recruiter")} /> Recruiter
          </label>
        </div>
        {role === "recruiter" && (
          <input className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-gold text-ink py-2 rounded">Sign up</button>
      </form>
      <p className="text-sm mt-4">
        Already have an account? <Link to="/login" className="text-gold-dark dark:text-gold">Log in</Link>
      </p>
    </div>
  );
}
