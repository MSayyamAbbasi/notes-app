import Modal from '../ui/Modal';
import NoteForm from './NoteForm';

export default function NoteFormModal({ isOpen, onClose, note, onSubmit, title }) {
  const isEdit = Boolean(note?.id);

  const handleSubmit = async (data) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || (isEdit ? 'Edit Note' : 'Create New Note')}
      size="lg"
    >
      <NoteForm
        key={note?.id ?? 'new'}
        initialData={note}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel={isEdit ? 'Update Note' : 'Create Note'}
      />
    </Modal>
  );
}
