import { Activity, Link2, MousePointer2, Radio } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData, links } from "../../constants/data";
import StatCard from "../../components/ui/StatCard";
import Seo from "../../components/common/Seo";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getDashboard } from "../../api/dashboard.api";
export default function Dashboard() {
  const { user } = useAuth()
  const [dashboard, setDashboard] = useState({
    totalLinks: 0,
    activeLinks: 0,
    expiredLinks: 0,
    totalClicks: 0,
    todayClicks: 0,
    clicksOverTime: [],
    topCountries: [],
    recentLinks: [],
    topLinks: [],
  });
  async function getDashboardDetails() {
    try {
      const res = await getDashboard();
      console.log({res});
      
      if (res.data.success) {
        setDashboard(res.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    }
  }

  useEffect(() => {
    getDashboardDetails();
  }, []);
  return (
    <>
      <Seo title="Dashboard — Linklane" />
      <Title
        title={"welcome " + user.name.split(" ")[0]}
        sub="Here’s how your links are performing."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total links" value={dashboard.totalLinks} trend="8.2%" icon={Link2} />
        <StatCard
          label="Total clicks"
          value={dashboard.totalClicks}
          trend="16.8%"
          icon={MousePointer2}
        />
        <StatCard
          label="Today’s clicks"
          value={dashboard.todayClicks}
          trend="12.4%"
          icon={Activity}
        />
        <StatCard label="Active links" value={dashboard.activeLinks} trend="3.1%" icon={Radio} />
      </section>
      <div className="mt-7 grid gap-6 xl:grid-cols-3">
        <section className="card p-5 xl:col-span-2">
          <h2 className="font-bold">Clicks over time</h2>
          <p className="muted mt-1">Last 7 days</p>
          <div className="mt-5 h-64">
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#4F46E5" stopOpacity=".28" />
                    <stop offset="1" stopColor="#4F46E5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#area)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="card p-5">
          <h2 className="font-bold">Top countries</h2>
          <div className="mt-5 space-y-5">
            {[
              ["United States", 42],
              ["India", 24],
              ["United Kingdom", 16],
              ["Germany", 9],
            ].map(([n, v]) => (
              <div key={n}>
                <div className="flex justify-between text-sm">
                  <span>{n}</span>
                  <span className="font-semibold">{v}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded bg-indigo-600"
                    style={{ width: `${v}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="card mt-7 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <div>
            <h2 className="font-bold">Recent links</h2>
            <p className="muted mt-1">Your latest activity</p>
          </div>
          <button
            className="btn-secondary"
            onClick={() => toast.success("Link copied to clipboard")}
          >
            Copy latest
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950">
              <tr>
                {["Destination", "Short link", "Clicks", "Status"].map((x) => (
                  <th className="px-5 py-3 font-semibold" key={x}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {links.slice(0, 3).map((l) => (
                <tr className="border-b last:border-0" key={l[1]}>
                  <td className="max-w-48 truncate px-5 py-4">{l[0]}</td>
                  <td className="px-5 py-4 font-medium text-indigo-600">
                    {l[1]}
                  </td>
                  <td className="px-5 py-4">{l[2]}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {l[3]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
export function Title({ title, sub }) {
  return (
    <div className="mb-7">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
    </div>
  );
}
