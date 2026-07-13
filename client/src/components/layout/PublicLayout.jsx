import { Link, NavLink } from "react-router-dom";
import { Link2 } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
const nav = [
  ["Features", "/#features"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
];
export const Brand = () => (
  <Link
    to="/"
    className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
  >
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">
      <Link2 size={17} />
    </span>
    Linklane
  </Link>
);
export default function PublicLayout({ children }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-transparent bg-slate-50/80 backdrop-blur-lg dark:bg-slate-950/80">
        <nav className="shell flex h-16 items-center justify-between">
          <Brand />
          <div className="hidden items-center gap-7 md:flex">
            {nav.map(([n, to]) => (
              <a
                key={n}
                href={to}
                className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                {n}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link className="btn hidden sm:inline-flex" to="/login">
              Log in
            </Link>
            <Link className="btn-primary px-3 sm:px-4" to="/signup">
              Start free
            </Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className="border-t py-10">
        <div className="shell flex flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <Brand />
          <p>© 2026 Linklane. Built for teams that measure.</p>
        </div>
      </footer>
    </>
  );
}
