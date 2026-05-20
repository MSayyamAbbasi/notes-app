import { Plus, Bell } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { MobileMenuButton } from './Sidebar';
import Button from '../ui/Button';
import { useNotes } from '../../context/NotesContext';

const pageTitles = {
  '/': 'Dashboard',
  '/add': 'Add Note',
  '/notes': 'All Notes',
};

export default function Header({ onMenuClick, searchValue, onSearchChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { filters, updateFilters } = useNotes();

  const handleSearch = (value) => {
    onSearchChange?.(value);
    updateFilters({ search: value });
  };

  const title = pageTitles[location.pathname] || 'NotesPro';

  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <MobileMenuButton onClick={onMenuClick} />
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white truncate">
              {title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
              Organize and manage your notes efficiently
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              className="hidden sm:flex p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => navigate('/add')}
            >
              <Plus size={18} />
              New Note
            </Button>
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-sm shadow-md"
              title="User Profile"
            >
              NP
            </div>
          </div>
        </div>

        {location.pathname !== '/add' && (
          <SearchBar
            value={searchValue ?? filters.search}
            onChange={handleSearch}
          />
        )}
      </div>
    </header>
  );
}
