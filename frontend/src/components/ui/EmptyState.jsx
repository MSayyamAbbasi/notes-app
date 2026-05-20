import { FileText, Plus } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ onAddNote, title = 'No notes yet', description }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
        <FileText className="w-10 h-10 text-white" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
        {description ||
          'Start capturing your ideas. Create your first note and organize them by category.'}
      </p>
      {onAddNote && (
        <Button onClick={onAddNote} size="lg">
          <Plus size={20} />
          Create your first note
        </Button>
      )}
    </div>
  );
}
