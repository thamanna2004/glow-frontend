import { productFilters, sortOptions } from "../data/products";

export default function FilterBar({ selectedFilter, onFilterChange, sortBy, onSortChange }) {
  return (
    <div className="glass-panel mb-8 rounded-[24px] p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {productFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition duration-300 ${
                selectedFilter === filter
                  ? "bg-navy-900 text-white shadow-[0_8px_20px_-10px_rgba(26,43,74,0.4)]"
                  : "bg-ice-100 text-navy-900 hover:bg-ice-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-full border border-ice-200 bg-white px-4 py-2 text-sm text-navy-900 outline-none focus:border-ice-300"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
