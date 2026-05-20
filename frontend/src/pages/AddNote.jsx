import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNotes } from '../context/NotesContext';
import NoteForm from '../components/notes/NoteForm';
import { PenLine } from 'lucide-react';

export default function AddNote() {
  const navigate = useNavigate();
  const { createNote } = useNotes();

  const handleSubmit = async (data) => {
    try {
      await createNote(data);
      navigate('/notes');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <PenLine className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Create New Note
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill in the details below to add a new note
            </p>
          </div>
        </div>
        <NoteForm
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          submitLabel="Create Note"
        />
      </div>
    </div>
  );
}
