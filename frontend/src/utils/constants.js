export const CATEGORIES = [
  'General',
  'Work',
  'Personal',
  'Ideas',
  'Meeting',
  'Research',
  'Archive',
];

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'title-desc', label: 'Title Z–A' },
  { value: 'category-asc', label: 'Category' },
];

export const CATEGORY_COLORS = {
  General: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  Work: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  Personal: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  Ideas: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  Meeting: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  Research: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
  Archive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || CATEGORY_COLORS.General;
