import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import JobCard from "../components/JobCard";
import type { Job } from "../components/JobCard";

function BridgeGraphic() {
  // Two nodes ("Talent" and "Opportunity") connected by an arched path —
  // the literal shape of what this product does, instead of a decorative
  // gradient blob.
  return (
    <svg viewBox="0 0 420 300" className="w-full max-w-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 230C40 90 380 90 380 230"
        stroke="currentColor"
        className="text-ink/15 dark:text-paper/15"
        strokeWidth="2"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      <path
        d="M40 230C90 130 330 130 380 230"
        stroke="currentColor"
        className="text-teal"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="40" cy="230" r="7" className="fill-gold" />
      <circle cx="380" cy="230" r="7" className="fill-teal" />
      <text x="14" y="262" className="fill-ink dark:fill-paper" fontFamily="Manrope" fontSize="13">
        Students
      </text>
      <text x="322" y="262" className="fill-ink dark:fill-paper" fontFamily="Manrope" fontSize="13">
        Recruiters
      </text>
    </svg>
  );
}

export default function Home() {
  const [preview, setPreview] = useState<Job[]>([]);

  useEffect(() => {
    api.get("/jobs", { params: { limit: 3 } }).then((res) => setPreview(res.data.jobs));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] text-ink dark:text-paper">
            The shortest path between coursework and your first offer
          </h1>
          <p className="mt-5 text-slate dark:text-paper/70 max-w-md">
            SkillBridge connects students straight to recruiters who are actively hiring —
            no cold applications into a void, no recruiters sorting through spam.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jobs" className="px-5 py-2.5 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm">
              Browse open roles
            </Link>
            <Link to="/register" className="px-5 py-2.5 rounded-full border border-ink/20 dark:border-paper/25 text-sm">
              Post a job as a recruiter
            </Link>
          </div>
          <div className="mt-10 flex gap-10 text-sm">
            <div>
              <p className="font-display text-2xl text-ink dark:text-paper">{preview.length > 0 ? "Live" : "—"}</p>
              <p className="text-slate dark:text-paper/60">roles updated from real listings</p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink dark:text-paper">2</p>
              <p className="text-slate dark:text-paper/60">roles: student or recruiter</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end text-ink dark:text-paper">
          <BridgeGraphic />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10 dark:border-paper/10 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl text-ink dark:text-paper">For students</h2>
          <ol className="mt-6 space-y-5">
            {[
              ["Build your profile", "Add a bio and a link to your resume once — it's reused on every application."],
              ["Find a role that fits", "Search and filter by title, location, and job type."],
              ["Apply and track status", "See exactly where each application stands: applied, shortlisted, accepted."],
            ].map(([title, desc], i) => (
              <li key={title} className="flex gap-4">
                <span className="font-display text-lg text-gold-dark dark:text-gold shrink-0 w-6">{i + 1}</span>
                <div>
                  <p className="text-ink dark:text-paper">{title}</p>
                  <p className="text-sm text-slate dark:text-paper/60 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink dark:text-paper">For recruiters</h2>
          <ol className="mt-6 space-y-5">
            {[
              ["Post a role", "Title, location, type, and the skills you need — live in under a minute."],
              ["Review applicants", "See every student who applied, with their resume link and note, in one place."],
              ["Move candidates forward", "Update status as you shortlist, accept, or pass — students see it instantly."],
            ].map(([title, desc], i) => (
              <li key={title} className="flex gap-4">
                <span className="font-display text-lg text-gold-dark dark:text-gold shrink-0 w-6">{i + 1}</span>
                <div>
                  <p className="text-ink dark:text-paper">{title}</p>
                  <p className="text-sm text-slate dark:text-paper/60 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Live jobs preview */}
      {preview.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10 dark:border-paper/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ink dark:text-paper">Open right now</h2>
            <Link to="/jobs" className="text-sm text-gold-dark dark:text-gold">View all jobs</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {preview.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
