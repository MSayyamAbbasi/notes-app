export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-6 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3" />
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/5" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
