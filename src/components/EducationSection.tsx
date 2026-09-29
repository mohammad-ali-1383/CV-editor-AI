interface EducationSectionProps {
  education: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}

export function EducationSection({
  education,
  isEditing,
  onChange,
}: EducationSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Education
      </h2>

      {isEditing ? (
        <textarea
          value={education}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm leading-relaxed text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Degree — Institution (years)"
        />
      ) : (
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {education || 'No education details yet.'}
        </p>
      )}
    </section>
  );
}
