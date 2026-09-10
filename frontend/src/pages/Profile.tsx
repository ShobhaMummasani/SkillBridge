import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import api from "../api/axios";

export default function Profile() {
  const [form, setForm] = useState({ name: "", bio: "", resumeLink: "", company: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/users/me").then((res) => setForm({ ...form, ...res.data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.put("/users/me", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20"
          placeholder="Short bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <input
          className="w-full border border-ink/15 dark:border-paper/20 rounded px-3 py-2 dark:bg-ink-light dark:border-paper/20"
          placeholder="Resume link"
          value={form.resumeLink}
          onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
        />
        <button className="bg-gold text-ink px-4 py-2 rounded">Save</button>
        {saved && <p className="text-green-600 text-sm">Saved!</p>}
      </form>
    </div>
  );
}
