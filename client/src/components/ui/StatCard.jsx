import { motion } from "framer-motion";
export default function StatCard({ label, value, trend, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="card p-5">
      <div className="flex justify-between">
        <div>
          <p className="muted">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className="mt-2 text-xs font-semibold text-emerald-600">
              ↑ {trend} from last month
            </p>
          )}
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10">
          <Icon size={20} />
        </span>
      </div>
    </motion.div>
  );
}
