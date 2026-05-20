import NoteCard from './NoteCard';
import SkeletonCard from '../ui/SkeletonCard';
import EmptyState from '../ui/EmptyState';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function NotesGrid({
  notes,
  loading,
  onView,
  onEdit,
  onDelete,
  onAddNote,
  emptyTitle,
  emptyDescription,
}) {
  if (loading && notes.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!loading && notes.length === 0) {
    return (
      <EmptyState
        onAddNote={onAddNote}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <>
      {loading && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}
