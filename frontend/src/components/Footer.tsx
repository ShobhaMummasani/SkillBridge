import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paper/10 mt-24 px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-6 text-sm text-slate dark:text-paper/60">
        <div>
          <p className="font-display text-base text-ink dark:text-paper">SkillBridge</p>
          <p className="mt-1 max-w-xs">A career portal connecting students with real hiring recruiters.</p>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-1.5">
            <span className="text-ink dark:text-paper">Platform</span>
            <Link to="/jobs" className="hover:text-gold-dark dark:hover:text-gold">Browse jobs</Link>
            <Link to="/register" className="hover:text-gold-dark dark:hover:text-gold">Create account</Link>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-ink dark:text-paper">Project</span>
            <span>LaunchED capstone, 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
