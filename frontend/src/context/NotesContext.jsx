import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { notesService } from '../services/notesService';

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sort: 'date-desc',
  });

  const fetchNotes = useCallback(async (override = {}) => {
    const params = { ...filters, ...override };
    setLoading(true);
    try {
      const { data } = await notesService.getAll({
        search: params.search || undefined,
        category: params.category === 'all' ? undefined : params.category,
        sort: params.sort,
      });
      setNotes(data.data || []);
    } catch (err) {
      toast.error(err.message);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createNote = async (noteData) => {
    const { data } = await notesService.create(noteData);
    setNotes((prev) => [data.data, ...prev]);
    toast.success('Note created successfully');
    return data.data;
  };

  const updateNote = async (id, noteData) => {
    const { data } = await notesService.update(id, noteData);
    setNotes((prev) => prev.map((n) => (n.id === id ? data.data : n)));
    toast.success('Note updated successfully');
    return data.data;
  };

  const deleteNote = async (id) => {
    await notesService.delete(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    toast.success('Note deleted successfully');
  };

  const updateFilters = useCallback((partial) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const stats = useMemo(() => {
    const byCategory = notes.reduce((acc, n) => {
      acc[n.category] = (acc[n.category] || 0) + 1;
      return acc;
    }, {});
    return {
      total: notes.length,
      categories: Object.keys(byCategory).length,
      recent: notes.slice(0, 3),
      byCategory,
    };
  }, [notes]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        filters,
        stats,
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
        updateFilters,
        setFilters,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
};
