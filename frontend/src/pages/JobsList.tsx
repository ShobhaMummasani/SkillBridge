import { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";
import type { Job } from "../components/JobCard";

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const { data } = await api.get("/jobs", { params: { search, location, type, page, limit: 6 } });
    setJobs(data.jobs);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Browse jobs & internships</h1>
      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
        <input className="border border-ink/15 dark:border-paper/20 rounded px-3 py-2 flex-1 min-w-40 dark:bg-ink-light dark:border-paper/20" placeholder="Search title..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <input className="border border-ink/15 dark:border-paper/20 rounded px-3 py-2 flex-1 min-w-40 dark:bg-ink-light dark:border-paper/20" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <select className="border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All types</option>
          <option value="Internship">Internship</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
        </select>
        <button className="bg-gold text-ink px-4 py-2 rounded">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-slate-500">No jobs match your search yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-2 mt-6">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 border border-ink/15 dark:border-paper/20 rounded disabled:opacity-40">
          Prev
        </button>
        <span className="px-2 py-1">
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border border-ink/15 dark:border-paper/20 rounded disabled:opacity-40">
          Next
        </button>
      </div>
    </div>
  );
}
