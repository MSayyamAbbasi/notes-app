import { Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import { formatDate, truncateText } from '../../utils/formatDate';
import { getCategoryColor } from '../../utils/constants';
import Button from '../ui/Button';

export default function NoteCard({ note, onView, onEdit, onDelete }) {
  return (
    <article
      className="
        group relative rounded-2xl bg-white dark:bg-slate-800/90
        border border-slate-200/80 dark:border-slate-700/80
        p-6 shadow-card hover:shadow-card-hover
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-indigo-200/80 dark:hover:border-indigo-500/40
        animate-slide-up
      "
    >
      <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white line-clamp-2 flex-1">
          {note.title}
        </h3>
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(note.category)}`}
        >
          {note.category}
        </span>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
        {truncateText(note.content, 140)}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/80">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Calendar size={14} />
          <time dateTime={note.created_at}>{formatDate(note.created_at)}</time>
        </div>

        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100">
          <Button variant="ghost" size="icon" onClick={() => onView(note)} title="View">
            <Eye size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(note)} title="Edit">
            <Pencil size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(note)}
            title="Delete"
            className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </article>
  );
}
