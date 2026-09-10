import { Link } from "react-router-dom";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      to={`/jobs/${job._id}`}
      className="block p-5 rounded-lg border border-ink/10 dark:border-paper/15 hover:border-gold-dark dark:hover:border-gold transition-colors bg-white/40 dark:bg-white/5"
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-display text-lg text-ink dark:text-paper">{job.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-teal/10 text-teal dark:bg-teal/20 dark:text-teal shrink-0">
          {job.type}
        </span>
      </div>
      <p className="text-sm text-slate dark:text-paper/60 mt-1">
        {job.company} · {job.location}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {job.skills?.slice(0, 4).map((s) => (
          <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-ink/5 dark:bg-paper/10 text-slate dark:text-paper/70">
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}
