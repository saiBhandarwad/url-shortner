import { Check, Link2, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Seo from "../../components/common/Seo";
export function Pricing() {
  const plans = [
    ["Free", "$0", ["50 links per month", "Basic analytics", "QR codes"]],
    [
      "Pro",
      "$12",
      [
        "Unlimited links",
        "Advanced analytics",
        "Custom domains",
        "Priority support",
      ],
    ],
    [
      "Enterprise",
      "Custom",
      ["Team permissions", "SLA & onboarding", "Dedicated support"],
    ],
  ];
  return (
    <PublicLayout>
      <Seo title="Pricing — Linklane" />
      <section className="shell py-20 text-center">
        <p className="eyebrow">Pricing</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Clear plans, no surprises.
        </h1>
        <p className="mt-4 text-slate-500">
          Start free and grow when your links do.
        </p>
        <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
          {plans.map(([n, p, items], i) => (
            <article
              className={`card p-7 ${i === 1 ? "ring-2 ring-indigo-600" : ""}`}
              key={n}
            >
              <h2 className="font-bold">{n}</h2>
              <p className="mt-4 text-4xl font-bold">
                {p}
                <span className="text-sm font-normal text-slate-500">
                  {p[0] === "$" ? "/month" : ""}
                </span>
              </p>
              <ul className="mt-7 space-y-3">
                {items.map((x) => (
                  <li className="flex gap-2 text-sm" key={x}>
                    <Check size={17} className="text-emerald-500" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={
                  i === 1
                    ? "btn-primary mt-8 w-full"
                    : "btn-secondary mt-8 w-full"
                }
              >
                Get started
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
export function About() {
  return (
    <PublicLayout>
      <Seo title="About — Linklane" />
      <section className="shell max-w-4xl py-20">
        <p className="eyebrow">About Linklane</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          A more thoughtful link in every interaction.
        </h1>
        <div className="mt-10 space-y-10 text-lg leading-8 text-slate-600 dark:text-slate-400">
          <p>
            We believe short links should feel like infrastructure: dependable,
            clear, and quietly powerful. Linklane gives small teams the context
            they need to make better decisions.
          </p>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Built with modern tools
            </h2>
            <p className="mt-3">
              React, Vite, Tailwind CSS, Framer Motion, TanStack Query and
              Recharts—chosen to keep the experience quick and composed.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Made by an independent developer
            </h2>
            <p className="mt-3">
              A portfolio-grade product concept focused on craft, accessibility,
              and useful detail.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
export function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <Seo title="Page not found — Linklane" />
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Link2 size={35} />
        </div>
        <p className="mt-7 text-7xl font-extrabold">404</p>
        <h1 className="mt-3 text-2xl font-bold">
          This link went somewhere else.
        </h1>
        <p className="mt-3 text-slate-500">
          The page you requested does not exist.
        </p>
        <Link to="/" className="btn-primary mt-7">
          <MoveLeft size={17} />
          Go home
        </Link>
      </div>
    </div>
  );
}
