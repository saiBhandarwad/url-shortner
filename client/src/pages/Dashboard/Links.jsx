import { Copy, ExternalLink, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { links } from "../../constants/data";
import { Title } from "./Dashboard";
import CreateLinkModal from "./CreateLinkModal";
import { useEffect, useState } from "react";
import { getAllLinksByUser } from "../../api/link.api";
import dayjs from "dayjs";
import { buildPaginationPayload } from "../../utils/payload";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";


export default function Links() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [userLinks, setUserLinks] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 2,
    totalPages: 1,
    totalRecords: 1,
  });
  async function getAllLinks() {
    let payload = buildPaginationPayload({ page, search : debouncedSearch })
    const res = await getAllLinksByUser(payload)

    console.log({ res });

    if (res.data.success) {
      const { links, pagination } = res.data.data
      setUserLinks(links)
      setPagination(pagination)
    }
  }
  useEffect(() => {
    getAllLinks()
  }, [page, debouncedSearch])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy.");
    }
  };
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
            <input onChange={(e)=>setSearch(e.target.value)} className="input pl-10" placeholder="Search links" />
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
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
                  "Short Code",
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
              {userLinks.map((l) => (
                <tr key={l["_id"]} className="border-b">
                  <td className="max-w-56 truncate px-5 py-4">{l["originalUrl"]}</td>
                  <td className="px-5 py-4 font-semibold text-indigo-600">
                    {l["shortCode"]}
                  </td>
                  <td className="px-5 py-4">{l["clickCount"]}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${l["isActive"] === "true" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {l["isActive"] ? "Active" : "In Active"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{dayjs(l["createdAt"]).format("DD/MM/YYYY")}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button
                        aria-label="Copy link"
                        onClick={() => copyToClipboard(import.meta.env.VITE_API_BASE_URL + "/link/" + l["shortCode"])}
                        className="p-2 hover:text-indigo-600"
                      >
                        <Copy size={16} />
                      </button>
                      <button>
                        <Link
                          to={l["originalUrl"]}
                          target="_blank"
                        >
                          <ExternalLink size={16} />

                        </Link>
                      </button>

                      {/* <button
                        aria-label="Delete link"
                        onClick={() =>
                          toast("Delete is a backend action placeholder")
                        }
                        className="p-2 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-5 text-sm text-slate-500">
          <span>Showing Page {pagination?.currentPage} of {pagination?.totalPages} </span>
          <div className="flex gap-2">
            <button className="btn-secondary py-1.5" disabled={!pagination.hasPrevPage} onClick={() => setPage(prev => prev - 1)}>Previous</button>
            <button className="btn-secondary py-1.5" disabled={!pagination.hasNextPage} onClick={() => setPage(prev => prev + 1)}>Next</button>
          </div>
        </div>
      </div>
      <CreateLinkModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
