import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function BridgeMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="19" r="3" className="fill-gold" />
      <circle cx="21" cy="19" r="3" className="fill-teal" />
      <path
        d="M5 19C5 8 21 8 21 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="sticky top-0 z-30 backdrop-blur bg-paper/90 dark:bg-ink/90 border-b border-ink/10 dark:border-paper/10 px-6 py-3.5 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-ink dark:text-paper">
        <BridgeMark />
        <span className="font-display text-lg tracking-tight">SkillBridge</span>
      </Link>
      <div className="flex items-center gap-5 text-sm">
        <Link to="/jobs" className="hover:text-gold-dark dark:hover:text-gold transition-colors">Jobs</Link>
        {user?.role === "student" && (
          <Link to="/dashboard" className="hover:text-gold-dark dark:hover:text-gold transition-colors">My applications</Link>
        )}
        {user?.role === "recruiter" && (
          <Link to="/dashboard" className="hover:text-gold-dark dark:hover:text-gold transition-colors">My jobs</Link>
        )}
        {user && (
          <Link to="/profile" className="hover:text-gold-dark dark:hover:text-gold transition-colors">Profile</Link>
        )}
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
          className="px-2.5 py-1 rounded-full border border-ink/15 dark:border-paper/20 text-xs"
        >
          {dark ? "Light" : "Dark"}
        </button>
        {user ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-4 py-1.5 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm"
          >
            Log out
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-gold-dark dark:hover:text-gold transition-colors">Log in</Link>
            <Link to="/register" className="px-4 py-1.5 rounded-full bg-gold text-ink text-sm">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
