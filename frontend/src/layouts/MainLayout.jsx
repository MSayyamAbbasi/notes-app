import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { useNotes } from '../context/NotesContext';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect } from 'react';

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const { filters, updateFilters, fetchNotes } = useNotes();
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    updateFilters({ search: debouncedSearch });
  }, [debouncedSearch, updateFilters]);

  useEffect(() => {
    fetchNotes();
  }, [filters.category, filters.sort, filters.search, fetchNotes]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setMobileOpen(true)}
          searchValue={localSearch}
          onSearchChange={setLocalSearch}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
