interface EditToggleProps {
  isEditing: boolean;
  onToggle: () => void;
  onCancel?: () => void;
}

export function EditToggle({ isEditing, onToggle, onCancel }: EditToggleProps) {
  return (
    <div className="flex items-center gap-3">
      {isEditing && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          Cancel
        </button>
      )}
      <button
        type="button"
        onClick={onToggle}
        className={`rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isEditing
            ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
        }`}
      >
        {isEditing ? 'Save Changes' : 'Edit CV'}
      </button>
    </div>
  );
}
