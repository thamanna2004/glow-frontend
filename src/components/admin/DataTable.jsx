import { useMemo, useState } from "react";
import { motion } from "framer-motion";

function SortIcon({ active, direction }) {
  return (
    <svg viewBox="0 0 12 12" className={`ml-1 inline h-3 w-3 ${active ? "text-gold" : "text-slate-300"}`}>
      <path
        d={direction === "asc" ? "M6 3l3 4H3l3-4z" : "M6 9L3 5h6l-3 4z"}
        fill="currentColor"
      />
    </svg>
  );
}

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  searchPlaceholder = "Search...",
  searchKeys = [],
  defaultSearch = "",
  filters = [],
  pageSize = 8,
  emptyMessage = "No records found.",
  className = "",
}) {
  const [search, setSearch] = useState(defaultSearch);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  const filtered = useMemo(() => {
    let rows = [...data];

    if (search.trim() && searchKeys.length) {
      const q = search.toLowerCase();
      rows = rows.filter((row) =>
        searchKeys.some((key) =>
          String(row[key] ?? "")
            .toLowerCase()
            .includes(q)
        )
      );
    }

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== "all") {
        rows = rows.filter((row) => String(row[key]) === value);
      }
    });

    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === "number" && typeof bv === "number") {
          return sortDir === "asc" ? av - bv : bv - av;
        }
        const cmp = String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return rows;
  }, [data, search, searchKeys, sortKey, sortDir, activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key, sortable) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 stroke-slate-400 fill-none stroke-2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-sand/45 bg-cream/90 py-2.5 pl-10 pr-4 text-sm text-charcoal outline-none transition focus:border-gold/55 focus:ring-2 focus:ring-gold/12"
          />
        </div>

        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <select
                key={filter.key}
                value={activeFilters[filter.key] || "all"}
                onChange={(e) => {
                  setActiveFilters((prev) => ({ ...prev, [filter.key]: e.target.value }));
                  setPage(1);
                }}
                className="rounded-full border border-ice-200/80 bg-ivory/90 px-4 py-2 text-xs font-medium text-charcoal outline-none focus:border-gold/50"
              >
                <option value="all">{filter.label}: All</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-[24px] border border-sand/45 bg-linear-to-br from-cream to-champagne/50 shadow-[0_20px_48px_-24px_rgba(43,36,32,0.14)] backdrop-blur-sm"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-ice-100/80 bg-beige/40 text-xs uppercase tracking-[0.14em] text-slate-500">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-4 font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort(col.key, col.sortable)}
                      className={`inline-flex items-center ${col.sortable ? "cursor-pointer hover:text-charcoal" : "cursor-default"}`}
                    >
                      {col.header}
                      {col.sortable && (
                        <SortIcon active={sortKey === col.key} direction={sortDir} />
                      )}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-500">
                    Loading...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-500">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row, rowIndex) => {
                  const rowId = row._id || row.id || rowIndex;
                  return (
                    <motion.tr
                      key={rowId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: rowIndex * 0.03 }}
                      className="border-b border-ice-50/80 transition hover:bg-beige/30"
                    >
                      {columns.map((col) => (
                        <td key={col.key} className="px-5 py-4 text-charcoal">
                          {col.render ? col.render(row) : row[col.key]}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && filtered.length > pageSize && (
          <div className="flex items-center justify-between border-t border-ice-100/80 px-5 py-3 text-xs text-slate-500">
            <span>
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-full border border-ice-200 px-3 py-1.5 transition hover:bg-beige/50 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-ice-200 px-3 py-1.5 transition hover:bg-beige/50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
