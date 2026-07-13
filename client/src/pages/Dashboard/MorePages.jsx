import {
  BarChart3,
  Copy,
  Download,
  Globe2,
  Laptop,
  Monitor,
  QrCode,
  Shield,
  Trash2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import toast from "react-hot-toast";
import { chartData, countryData } from "../../constants/data";
import { Title } from "./Dashboard";
export function Analytics() {
  return (
    <>
      <Title
        title="Analytics"
        sub="Performance across all of your short links."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Chart title="Clicks by day">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Audience by country">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={countryData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
              >
                {countryData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#4F46E5", "#7C3AED", "#22C55E", "#94A3B8"][i]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          [
            "Devices",
            [
              ["Desktop", "62%"],
              ["Mobile", "31%"],
              ["Tablet", "7%"],
            ],
            Monitor,
          ],
          [
            "Browsers",
            [
              ["Chrome", "56%"],
              ["Safari", "25%"],
              ["Firefox", "11%"],
            ],
            Globe2,
          ],
          [
            "Top link",
            [
              ["/launch", "4,289 clicks"],
              ["/summer", "1,842 clicks"],
              ["/github", "984 clicks"],
            ],
            BarChart3,
          ],
        ].map(([title, rows, Icon]) => (
          <div className="card p-5" key={title}>
            <div className="flex items-center gap-2 font-bold">
              <Icon size={18} className="text-indigo-600" />
              {title}
            </div>
            <div className="mt-5 space-y-4">
              {rows.map(([a, b]) => (
                <div className="flex justify-between text-sm" key={a}>
                  <span className="text-slate-500">{a}</span>
                  <span className="font-semibold">{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function Chart({ title, children }) {
  return (
    <section className="card p-5">
      <h2 className="font-bold">{title}</h2>
      <div className="mt-5 h-64">{children}</div>
    </section>
  );
}
export function QRCodes() {
  return (
    <>
      <Title
        title="QR codes"
        sub="Connect offline moments to your digital experiences."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="card p-6 lg:col-span-2">
          <h2 className="font-bold">Create a QR code</h2>
          <p className="muted mt-1">
            Generate a branded code for any destination.
          </p>
          <div className="mt-6 space-y-4">
            <input
              className="input"
              defaultValue="https://linklane.io/launch"
              aria-label="QR code destination"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <select className="input">
                <option>Indigo</option>
                <option>Black</option>
              </select>
              <select className="input">
                <option>Square corners</option>
                <option>Rounded corners</option>
              </select>
            </div>
            <button
              onClick={() => toast.success("QR code generated")}
              className="btn-primary"
            >
              <QrCode size={17} />
              Generate QR code
            </button>
          </div>
        </section>
        <section className="card grid place-items-center p-6 text-center">
          <div className="grid h-40 w-40 place-items-center rounded-xl bg-[repeating-conic-gradient(#0f172a_0_25%,white_0_50%)] bg-[length:20px_20px]">
            <div className="grid h-9 w-9 place-items-center rounded bg-white">
              <QrCode size={21} />
            </div>
          </div>
          <p className="mt-5 font-semibold">launch-qr.png</p>
          <button
            className="btn-secondary mt-3"
            onClick={() => toast.success("Download prepared")}
          >
            <Download size={16} />
            Download
          </button>
        </section>
      </div>
    </>
  );
}
export function Settings() {
  return (
    <>
      <Title
        title="Settings"
        sub="Manage preferences and workspace security."
      />
      <div className="max-w-3xl space-y-5">
        <Panel
          title="Appearance"
          description="Choose how Linklane looks for you."
        >
          <select className="input max-w-xs">
            <option>System preference</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </Panel>
        <Panel
          title="Notifications"
          description="Stay informed about important link activity."
        >
          <Toggle label="Weekly performance digest" checked />
          <Toggle label="Campaign milestones" />
        </Panel>
        <Panel
          title="Language & region"
          description="Control how dates and reports are displayed."
        >
          <select className="input max-w-xs">
            <option>English (India)</option>
            <option>English (US)</option>
          </select>
        </Panel>
        <Panel
          title="Danger zone"
          description="Permanently remove your account and all link data."
        >
          <button
            onClick={() =>
              toast.error("Account deletion requires backend confirmation")
            }
            className="btn border border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete account
          </button>
        </Panel>
      </div>
    </>
  );
}
function Panel({ title, description, children }) {
  return (
    <section className="card p-5">
      <h2 className="font-bold">{title}</h2>
      <p className="muted mt-1">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
function Toggle({ label, checked = false }) {
  return (
    <label className="mb-3 flex cursor-pointer items-center justify-between text-sm font-medium">
      {label}
      <input
        defaultChecked={checked}
        type="checkbox"
        className="h-5 w-9 accent-indigo-600"
      />
    </label>
  );
}
export function Profile() {
  return (
    <>
      <Title title="Profile" sub="Your public workspace identity." />
      <section className="card overflow-hidden">
        <div className="h-32 bg-slate-950" />
        <div className="px-6 pb-6">
          <div className="-mt-12 grid h-24 w-24 place-items-center rounded-full border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-700 dark:border-slate-900">
            A
          </div>
          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-xl font-bold">Alex Morgan</h2>
              <p className="mt-1 text-sm text-slate-500">
                alex@linklane.io · Joined June 2026
              </p>
            </div>
            <button
              className="btn-secondary"
              onClick={() =>
                toast("Profile editing is ready for your API integration")
              }
            >
              Edit profile
            </button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["124", "Links created"],
              ["18.4k", "Total clicks"],
              ["3", "Team members"],
            ].map(([v, l]) => (
              <div
                className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950"
                key={l}
              >
                <p className="text-xl font-bold">{v}</p>
                <p className="mt-1 text-xs text-slate-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
