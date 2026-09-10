import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

interface JobRow {
  _id: string;
  title: string;
  location: string;
  type: string;
}

interface Applicant {
  _id: string;
  status: string;
  applicant: { name: string; email: string; resumeLink: string };
}

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    api.get("/jobs/mine").then((res) => setJobs(res.data));
  }, []);

  const viewApplicants = async (jobId: string) => {
    setActiveJob(jobId);
    const { data } = await api.get(`/applications/job/${jobId}`);
    setApplicants(data);
  };

  const updateStatus = async (appId: string, status: string) => {
    await api.put(`/applications/${appId}/status`, { status });
    setApplicants((prev) => prev.map((a) => (a._id === appId ? { ...a, status } : a)));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My job postings</h1>
        <Link to="/post-job" className="bg-gold text-ink px-4 py-2 rounded">
          + Post a job
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job._id} className="border border-ink/15 dark:border-paper/20 rounded-lg p-4 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-slate-500">
                  {job.location} • {job.type}
                </p>
              </div>
              <button onClick={() => viewApplicants(job._id)} className="text-sm text-gold-dark dark:text-gold">
                View applicants
              </button>
            </div>

            {activeJob === job._id && (
              <div className="mt-4 border-t pt-4 space-y-2 dark:border-slate-700">
                {applicants.length === 0 ? (
                  <p className="text-sm text-slate-500">No applicants yet.</p>
                ) : (
                  applicants.map((a) => (
                    <div key={a._id} className="flex justify-between items-center text-sm">
                      <div>
                        <p>{a.applicant.name} — {a.applicant.email}</p>
                        <a href={a.applicant.resumeLink} target="_blank" className="text-gold-dark dark:text-gold text-xs">
                          View resume
                        </a>
                      </div>
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                        className="border border-ink/15 dark:border-paper/20 rounded px-2 py-1 dark:bg-ink-light dark:border-paper/20"
                      >
                        <option>Applied</option>
                        <option>Shortlisted</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
