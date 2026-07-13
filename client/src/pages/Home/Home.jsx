import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  Copy,
  LockKeyhole,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Seo from "../../components/common/Seo";
const features = [
  [Zap, "Smart links", "Create compact, reliable links in seconds."],
  [BarChart3, "Clear analytics", "See every meaningful click as it happens."],
  [QrCode, "QR codes", "Bring any offline touchpoint online."],
  [LockKeyhole, "Password protection", "Keep private destinations private."],
  [CalendarClock, "Link expiry", "Set links to disappear exactly when needed."],
  [Sparkles, "Custom aliases", "Make every destination unmistakably yours."],
];
function Preview() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="card overflow-hidden p-1.5">
        <div className="rounded-lg bg-slate-950 p-5 text-white">
          <div className="mb-7 flex items-center justify-between">
            <span className="font-bold">Overview</span>
            <span className="rounded bg-white/10 px-2 py-1 text-xs">
              Last 7 days
            </span>
          </div>
          <p className="text-xs text-slate-400">TOTAL CLICKS</p>
          <p className="mt-1 text-3xl font-bold">
            18,492 <span className="text-sm text-emerald-400">+16.8%</span>
          </p>
          <div className="mt-6 flex h-28 items-end gap-2">
            {[35, 58, 42, 74, 63, 88, 71, 95, 80, 100, 76, 91].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t bg-indigo-400/90"
              />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -left-10 top-12 rounded-xl border bg-white p-3 shadow-soft dark:bg-slate-900"
      >
        <p className="text-xs text-slate-500">Today’s clicks</p>
        <p className="text-lg font-bold">
          1,284 <span className="text-xs text-emerald-600">↑ 12%</span>
        </p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute -bottom-6 -right-4 rounded-xl border bg-white p-3 shadow-soft dark:bg-slate-900"
      >
        <p className="text-xs font-semibold">linklane.io/launch</p>
        <p className="mt-1 text-xs text-indigo-600">Copied to clipboard</p>
      </motion.div>
    </div>
  );
}
export default function Home() {
  return (
    <PublicLayout>
      <Seo />
      <main>
        <section className="shell grid items-center gap-16 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              The link layer for modern teams
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-5xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl"
            >
              Shorten, track &amp; manage every link.
            </motion.h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-400">
              Create branded short links, QR codes, and detailed analytics—all
              in one calm, focused workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/signup">
                Start for free <ArrowRight size={17} />
              </Link>
              <a className="btn-secondary" href="#preview">
                View demo
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              No credit card required · Free forever plan
            </p>
          </div>
          <Preview />
        </section>
        <section
          id="features"
          className="border-y bg-white py-20 dark:bg-slate-900/30"
        >
          <div className="shell">
            <div className="max-w-xl">
              <p className="eyebrow">Built for clarity</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Everything a great link needs.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(([Icon, title, desc]) => (
                <motion.article
                  whileHover={{ y: -4 }}
                  key={title}
                  className="card p-6"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-5 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section id="preview" className="shell py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Preview />
            <div>
              <p className="eyebrow">A better view</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Your links, beautifully organized.
              </h2>
              <p className="mt-4 leading-7 text-slate-500">
                A single source of truth for every campaign, channel, and
                conversion. Know what earns attention and act on it.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Real-time reporting",
                  "Campaign-ready QR codes",
                  "Team-ready workspace",
                ].map((x) => (
                  <li className="flex gap-3 text-sm font-medium" key={x}>
                    <Check size={18} className="text-emerald-500" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="bg-slate-950 py-20 text-white">
          <div className="shell text-center">
            <p className="eyebrow text-indigo-300">
              Simple, transparent pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Start small. Scale without friction.
            </h2>
            <div className="mx-auto mt-9 grid max-w-4xl gap-5 md:grid-cols-3">
              {[
                ["Free", "$0", "For side projects"],
                ["Pro", "$12", "For growing teams"],
                ["Enterprise", "Let’s talk", "For organizations"],
              ].map(([n, p, d], i) => (
                <div
                  key={n}
                  className={`rounded-xl border p-6 text-left ${i === 1 ? "border-indigo-400 bg-white/10" : "border-white/10"}`}
                >
                  <h3 className="font-bold">{n}</h3>
                  <p className="mt-4 text-3xl font-bold">
                    {p}
                    <span className="text-sm font-normal text-slate-400">
                      {p[0] === "$" ? "/mo" : ""}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{d}</p>
                  <Link
                    to="/pricing"
                    className="btn mt-6 w-full bg-white text-slate-950 hover:bg-slate-100"
                  >
                    Choose {n}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="shell py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Make every click count.
          </h2>
          <p className="mt-3 text-slate-500">
            Join teams building a clearer picture of their audience.
          </p>
          <Link className="btn-primary mt-7" to="/signup">
            Create your free workspace <ArrowRight size={17} />
          </Link>
        </section>
      </main>
    </PublicLayout>
  );
}
