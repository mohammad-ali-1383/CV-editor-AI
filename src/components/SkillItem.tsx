import type { Skill } from '../types';

interface SkillItemProps {
  skill: Skill;
  isEditing: boolean;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function SkillItem({ skill, isEditing, onUpdate, onDelete }: SkillItemProps) {
  if (!isEditing) {
    return (
      <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
        {skill.name}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={skill.name}
        onChange={(e) => onUpdate(skill.id, e.target.value)}
        className="min-w-0 flex-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        placeholder="Skill name"
      />
      <button
        type="button"
        onClick={() => onDelete(skill.id)}
        className="shrink-0 rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
        title="Delete skill"
        aria-label={`Delete ${skill.name || 'skill'}`}
      >
        Delete
      </button>
    </div>
  );
}
