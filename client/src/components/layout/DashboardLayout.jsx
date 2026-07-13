import {
  BarChart3,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  Menu,
  QrCode,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Brand } from "./PublicLayout";
import ThemeToggle from "../ui/ThemeToggle";
const items = [
  [LayoutDashboard, "Dashboard", "/dashboard"],
  [LinkIcon, "Links", "/dashboard/links"],
  [BarChart3, "Analytics", "/dashboard/analytics"],
  [QrCode, "QR Codes", "/dashboard/qr-codes"],
  [Settings, "Settings", "/dashboard/settings"],
  [UserRound, "Profile", "/dashboard/profile"],
];
export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const side = (
    <aside className="flex h-full w-64 flex-col border-r bg-white p-4 dark:bg-slate-900">
      <Brand />
      <div className="mt-9 space-y-1">
        {items.map(([Icon, n, to]) => (
          <NavLink
            onClick={() => setOpen(false)}
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`
            }
          >
            <Icon size={18} />
            {n}
          </NavLink>
        ))}
      </div>
      <div className="mt-auto">
        <button
          onClick={() => {
            logout();
            nav("/");
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex">{side}</div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/30"
          />
          <div className="relative h-full">{side}</div>
        </div>
      )}
      <main className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b bg-white/75 px-5 backdrop-blur dark:bg-slate-900/75 sm:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <Menu />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
              {user?.name?.[0]}
            </span>
          </div>
        </header>
        <div className="p-5 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
