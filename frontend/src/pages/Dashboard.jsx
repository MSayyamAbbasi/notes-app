import { FileText, FolderOpen, Clock, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { useNoteActions } from '../hooks/useNoteActions';
import Button from '../components/ui/Button';
import NotesGrid from '../components/notes/NotesGrid';
import NoteFormModal from '../components/notes/NoteFormModal';
import ViewNoteModal from '../components/notes/ViewNoteModal';
import DeleteConfirmModal from '../components/notes/DeleteConfirmModal';
import NoteCard from '../components/notes/NoteCard';
import { getCategoryColor } from '../utils/constants';

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
    <div className={`w-11 h-11 rounded-xl ${accent} flex items-center justify-center mb-3`}>
      <Icon size={22} className="text-white" />
    </div>
    <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">{value}</p>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { notes, loading, stats } = useNotes();
  const actions = useNoteActions();
  const recentNotes = notes.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="rounded-2xl gradient-brand p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium mb-2">
            <TrendingUp size={16} />
            Welcome back
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
            Your Notes Workspace
          </h2>
          <p className="text-indigo-100/90 max-w-lg mb-6">
            Capture ideas, organize by category, and access everything from one professional dashboard.
          </p>
          <Button
            variant="secondary"
            className="!bg-white/20 !border-white/30 !text-white hover:!bg-white/30 backdrop-blur"
            onClick={actions.openCreate}
          >
            <Plus size={18} />
            Quick Add Note
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={FileText}
          label="Total Notes"
          value={stats.total}
          accent="bg-indigo-500"
        />
        <StatCard
          icon={FolderOpen}
          label="Categories"
          value={stats.categories}
          accent="bg-violet-500"
        />
        <StatCard
          icon={Clock}
          label="Recent Updates"
          value={recentNotes.length}
          accent="bg-purple-500"
        />
      </div>

      {Object.keys(stats.byCategory).length > 0 && (
        <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-card">
          <h3 className="font-display font-bold text-lg mb-4">Notes by Category</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.byCategory).map(([cat, count]) => (
              <span
                key={cat}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(cat)}`}
              >
                {cat}: {count}
              </span>
            ))}
          </div>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Recent Notes
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/notes')}>
            View all →
          </Button>
        </div>

        {recentNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onView={actions.openView}
                onEdit={actions.openEdit}
                onDelete={actions.openDelete}
              />
            ))}
          </div>
        ) : (
          <NotesGrid
            notes={[]}
            loading={loading}
            onAddNote={actions.openCreate}
            emptyTitle="No recent notes"
            emptyDescription="Create a note to see it here on your dashboard."
          />
        )}
      </section>

      <NoteFormModal
        isOpen={actions.formModal.isOpen}
        onClose={actions.formModal.close}
        note={actions.selectedNote}
        onSubmit={actions.handleSubmit}
      />
      <ViewNoteModal
        isOpen={actions.viewModal.isOpen}
        onClose={actions.viewModal.close}
        note={actions.selectedNote}
        onEdit={actions.openEdit}
      />
      <DeleteConfirmModal
        isOpen={actions.deleteModal.isOpen}
        onClose={actions.deleteModal.close}
        onConfirm={actions.handleDelete}
        note={actions.selectedNote}
        loading={actions.deleteLoading}
      />
    </div>
  );
}
