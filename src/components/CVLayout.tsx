import type { ReactNode } from 'react';

interface CVLayoutProps {
  children: ReactNode;
  headerActions?: ReactNode;
}

export function CVLayout({ children, headerActions }: CVLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50 py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-800">CV Editor</h1>
          {headerActions}
        </div>

        <article className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 sm:p-10">
          {children}
        </article>

        <p className="mt-6 text-center text-xs text-slate-400">
          Changes are saved locally in your browser.
        </p>
      </div>
    </div>
  );
}
