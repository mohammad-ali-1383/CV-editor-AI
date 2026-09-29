import type { Skill } from '../types';
import { SkillItem } from './SkillItem';

interface SkillsSectionProps {
  skills: Skill[];
  isEditing: boolean;
  onAdd: () => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function SkillsSection({
  skills,
  isEditing,
  onAdd,
  onUpdate,
  onDelete,
}: SkillsSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Skills
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={onAdd}
            className="rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200 transition hover:bg-indigo-100"
          >
            + Add skill
          </button>
        )}
      </div>

      {skills.length === 0 && !isEditing && (
        <p className="text-sm text-slate-500">No skills listed yet.</p>
      )}

      <div
        className={
          isEditing
            ? 'flex flex-col gap-2'
            : 'flex flex-wrap gap-2'
        }
      >
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            skill={skill}
            isEditing={isEditing}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
