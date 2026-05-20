import { Plus } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { useNoteActions } from '../hooks/useNoteActions';
import Button from '../components/ui/Button';
import NotesToolbar from '../components/layout/NotesToolbar';
import NotesGrid from '../components/notes/NotesGrid';
import NoteFormModal from '../components/notes/NoteFormModal';
import ViewNoteModal from '../components/notes/ViewNoteModal';
import DeleteConfirmModal from '../components/notes/DeleteConfirmModal';

export default function AllNotes() {
  const { notes, loading, filters, updateFilters } = useNotes();
  const actions = useNoteActions();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} found
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <NotesToolbar filters={filters} onFilterChange={updateFilters} />
          <Button onClick={actions.openCreate}>
            <Plus size={18} />
            Add Note
          </Button>
        </div>
      </div>

      <NotesGrid
        notes={notes}
        loading={loading}
        onView={actions.openView}
        onEdit={actions.openEdit}
        onDelete={actions.openDelete}
        onAddNote={actions.openCreate}
        emptyTitle="No notes match your filters"
        emptyDescription="Try adjusting your search or category filter, or create a new note."
      />

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
