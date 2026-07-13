import { Copy, ExternalLink, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { links } from "../../constants/data";
import { Title } from "./Dashboard";
export default function Links() {
  return (
    <>
      <Title title="My links" sub="Manage and measure every destination." />
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search
              className="absolute left-3 top-2.5 text-slate-400"
              size={18}
            />
            <input className="input pl-10" placeholder="Search links" />
          </div>
          <button className="btn-primary">
            <Plus size={17} />
            New link
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="border-y bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950">
              <tr>
                {[
                  "Original URL",
                  "Short URL",
                  "Clicks",
                  "Status",
                  "Created",
                  "Actions",
                ].map((x) => (
                  <th key={x} className="px-5 py-3">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {links.map((l) => (
                <tr key={l[1]} className="border-b">
                  <td className="max-w-56 truncate px-5 py-4">{l[0]}</td>
                  <td className="px-5 py-4 font-semibold text-indigo-600">
                    {l[1]}
                  </td>
                  <td className="px-5 py-4">{l[2]}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${l[3] === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {l[3]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{l[4]}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button
                        aria-label="Copy link"
                        onClick={() => toast.success("Short link copied")}
                        className="p-2 hover:text-indigo-600"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        aria-label="View link"
                        className="p-2 hover:text-indigo-600"
                      >
                        <ExternalLink size={16} />
                      </button>
                      <button
                        aria-label="Delete link"
                        onClick={() =>
                          toast("Delete is a backend action placeholder")
                        }
                        className="p-2 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-5 text-sm text-slate-500">
          <span>Showing 1–4 of 124 links</span>
          <div className="flex gap-2">
            <button className="btn-secondary py-1.5">Previous</button>
            <button className="btn-secondary py-1.5">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
