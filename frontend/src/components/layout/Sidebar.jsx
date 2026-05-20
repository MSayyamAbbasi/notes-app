import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  StickyNote,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/add', icon: PlusCircle, label: 'Add Note' },
  { to: '/notes', icon: FileText, label: 'All Notes' },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive
        ? 'gradient-brand text-white shadow-lg shadow-indigo-500/25'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
    }`;

  const content = (
    <>
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <StickyNote className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            NotesPro
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage your ideas</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={linkClass}
            onClick={onMobileClose}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8 px-2">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/80 dark:border-indigo-800/40">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            Pro Tip
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Use categories and search to keep your notes organized.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 glass border-r border-slate-200/60 dark:border-slate-700/60 p-6 min-h-screen">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 z-50 h-full w-72 glass p-6 flex flex-col
          transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button
          onClick={onMobileClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        {content}
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label="Open menu"
    >
      <Menu size={22} />
    </button>
  );
}
