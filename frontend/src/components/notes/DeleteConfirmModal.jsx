import { AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, note, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6 text-center animate-slide-up">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
          Delete Note?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-1">
          Are you sure you want to delete this note?
        </p>
        {note && (
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-6 truncate px-4">
            &ldquo;{note.title}&rdquo;
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose} disabled={loading} className="min-w-[100px]">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading} className="min-w-[120px]">
            {loading ? <LoadingSpinner size="sm" /> : 'Confirm Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
