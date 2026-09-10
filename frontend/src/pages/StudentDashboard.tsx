import { useEffect, useState } from "react";
import api from "../api/axios";

interface Application {
  _id: string;
  status: string;
  resumeLink: string;
  job: { title: string; company: string; location: string };
}

const statusColor: Record<string, string> = {
  Applied: "bg-slate-100 text-slate-700",
  Shortlisted: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function StudentDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    api.get("/applications/mine").then((res) => setApplications(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My applications</h1>
      {applications.length === 0 ? (
        <p className="text-slate-500">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="space-y-3">
          {applications.map((a) => (
            <div key={a._id} className="border rounded-lg p-4 flex justify-between items-center dark:border-slate-700">
              <div>
                <p className="font-medium">{a.job.title}</p>
                <p className="text-sm text-slate-500">
                  {a.job.company} • {a.job.location}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${statusColor[a.status] || ""}`}>{a.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
