import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNotes } from '../context/NotesContext';
import { useModal } from './useModal';

export const useNoteActions = () => {
  const { createNote, updateNote, deleteNote } = useNotes();
  const formModal = useModal();
  const viewModal = useModal();
  const deleteModal = useModal();
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreate = () => {
    setSelectedNote(null);
    formModal.open();
  };

  const openEdit = (note) => {
    setSelectedNote(note);
    formModal.open();
  };

  const openView = (note) => {
    setSelectedNote(note);
    viewModal.open();
  };

  const openDelete = (note) => {
    setSelectedNote(note);
    deleteModal.open();
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedNote?.id) {
        await updateNote(selectedNote.id, data);
      } else {
        await createNote(data);
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!selectedNote?.id) return;
    setDeleteLoading(true);
    try {
      await deleteNote(selectedNote.id);
      deleteModal.close();
      setSelectedNote(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    selectedNote,
    formModal,
    viewModal,
    deleteModal,
    deleteLoading,
    openCreate,
    openEdit,
    openView,
    openDelete,
    handleSubmit,
    handleDelete,
    setSelectedNote,
  };
};
