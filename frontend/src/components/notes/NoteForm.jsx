import { useEffect, useState } from 'react';
import { CATEGORIES } from '../../utils/constants';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

const emptyForm = { title: '', content: '', category: 'General' };

export default function NoteForm({ initialData, onSubmit, onCancel, submitLabel = 'Save Note' }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        content: initialData.content || '',
        category: initialData.category || 'General',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required';
    if (!form.content.trim()) next.content = 'Description is required';
    if (!form.category.trim()) next.category = 'Category is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        content: form.content.trim(),
        category: form.category,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white
     placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50
     ${
       errors[field]
         ? 'border-red-400 dark:border-red-500'
         : 'border-slate-200 dark:border-slate-600'
     }`;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter note title"
          className={inputClass('title')}
          maxLength={255}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Write your note content..."
          rows={6}
          className={`${inputClass('content')} resize-none`}
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={inputClass('category')}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? <LoadingSpinner size="sm" /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
