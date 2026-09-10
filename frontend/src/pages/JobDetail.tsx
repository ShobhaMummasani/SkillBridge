import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface JobFull {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
}

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState<JobFull | null>(null);
  const [resumeLink, setResumeLink] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleApply = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/applications", { jobId: id, resumeLink, coverNote });
      setMessage("Applied successfully!");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Could not apply");
    }
  };

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <p className="text-slate-500 mt-1">
        {job.company} • {job.location} • {job.type}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {job.skills.map((s) => (
          <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
            {s}
          </span>
        ))}
      </div>
      <p className="mt-6 whitespace-pre-line">{job.description}</p>

      {user?.role === "student" && (
        <form onSubmit={handleApply} className="mt-8 border-t pt-6 space-y-3 dark:border-slate-700">
          <h2 className="font-medium">Apply for this role</h2>
          <input
            className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20"
            placeholder="Resume link (Google Drive, etc.)"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            required
          />
          <textarea
            className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20"
            placeholder="Short note to the recruiter (optional)"
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
          />
          <button className="bg-gold text-ink px-4 py-2 rounded">Apply</button>
          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
}
