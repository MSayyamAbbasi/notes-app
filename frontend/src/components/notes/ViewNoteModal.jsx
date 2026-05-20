import { Calendar, Tag } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { formatDateTime } from '../../utils/formatDate';
import { getCategoryColor } from '../../utils/constants';

export default function ViewNoteModal({ isOpen, onClose, note, onEdit }) {
  if (!note) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={note.title} size="lg">
      <div className="p-6 space-y-5 animate-slide-up">
        <div className="flex flex-wrap gap-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(note.category)}`}
          >
            <Tag size={14} />
            {note.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            Created {formatDateTime(note.created_at)}
          </span>
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
        {note.updated_at && note.updated_at !== note.created_at && (
          <p className="text-xs text-slate-400">
            Last updated {formatDateTime(note.updated_at)}
          </p>
        )}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => { onClose(); onEdit(note); }}>
            Edit Note
          </Button>
        </div>
      </div>
    </Modal>
  );
}
