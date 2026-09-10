// Loads real, currently-live job postings into your database from the
// Remotive public jobs API (https://remotive.com/api/remote-jobs) — free,
// no API key needed.
//
// Usage:
//   npx ts-node src/scripts/seedJobs.ts recruiter@example.com
//
// The email must belong to an account you already registered through the
// app UI with role = recruiter. All seeded jobs will show up as "posted
// by" that recruiter, so they appear correctly in the recruiter dashboard.

import mongoose from "mongoose";
import dotenv from "dotenv";
import https from "https";
import dns from "dns";
import { connectDB } from "../config/db";
import User from "../models/User";
import Job from "../models/Job";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Windows DNS (even after changing adapter settings) sometimes still can't
// resolve normal websites for Node's default lookup. This does the address
// lookup itself using Google's DNS (the same servers set in db.ts), then
// connects directly to that address, so it never depends on Windows' DNS.
function fetchJson(url: string): Promise<any> {
  const parsed = new URL(url);
  return new Promise((resolve, reject) => {
    dns.resolve4(parsed.hostname, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return reject(err || new Error(`Could not resolve ${parsed.hostname}`));
      }
      const req = https.request(
        {
          host: addresses[0],
          servername: parsed.hostname, // keeps HTTPS security check correct
          path: parsed.pathname + parsed.search,
          headers: { Host: parsed.hostname },
          method: "GET",
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          });
        }
      );
      req.on("error", reject);
      req.end();
    });
  });
}

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1500);

const mapJobType = (remotiveType: string): "Internship" | "Full-Time" | "Part-Time" => {
  const t = remotiveType.toLowerCase();
  if (t.includes("intern")) return "Internship";
  if (t.includes("part")) return "Part-Time";
  return "Full-Time";
};

async function run() {
  const recruiterEmail = process.argv[2];
  if (!recruiterEmail) {
    console.error("Usage: npx ts-node src/scripts/seedJobs.ts <recruiter-email>");
    process.exit(1);
  }

  await connectDB();

  const recruiter = await User.findOne({ email: recruiterEmail.toLowerCase(), role: "recruiter" });
  if (!recruiter) {
    console.error(
      `No recruiter account found for ${recruiterEmail}. Register that account through the app first (role = recruiter), then run this script again.`
    );
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log("Fetching real job postings from Remotive API...");
  const data = (await fetchJson(
    "https://remotive.com/api/remote-jobs?category=software-dev&limit=25"
  )) as { jobs: any[] };

  let inserted = 0;
  for (const j of data.jobs) {
    const exists = await Job.findOne({ title: j.title, company: j.company_name });
    if (exists) continue;

    await Job.create({
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location || "Remote",
      type: mapJobType(j.job_type || "full_time"),
      description: stripHtml(j.description || "") || "No description provided.",
      skills: Array.isArray(j.tags) ? j.tags.slice(0, 6) : [],
      postedBy: recruiter._id,
    });
    inserted++;
  }

  console.log(`Done. Inserted ${inserted} new real job postings for ${recruiterEmail}.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
