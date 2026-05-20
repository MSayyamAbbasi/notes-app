import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search notes...' }) {
  return (
    <div className="relative flex-1 max-w-xl">
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-2.5 rounded-xl
          bg-slate-100/80 dark:bg-slate-800/80
          border border-transparent
          focus:border-indigo-300 dark:focus:border-indigo-600
          focus:bg-white dark:focus:bg-slate-800
          focus:outline-none focus:ring-2 focus:ring-indigo-500/20
          text-sm text-slate-900 dark:text-white
          placeholder:text-slate-400 transition-all
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
