import { useState, useCallback } from 'react';
import type { CVData, Skill } from './types';
import { useCVStorage } from './hooks/useCVStorage';
import { CVLayout } from './components/CVLayout';
import { EditToggle } from './components/EditToggle';
import { ProfileSection } from './components/ProfileSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';

function createSkillId(): string {
  return `skill-${crypto.randomUUID()}`;
}

export default function App() {
  const { cv, setCV, save, resetToSaved } = useCVStorage();
  const [isEditing, setIsEditing] = useState(false);

  const updateCV = useCallback((patch: Partial<CVData>) => {
    setCV((prev) => ({ ...prev, ...patch }));
  }, [setCV]);

  const handleAddSkill = useCallback(() => {
    setCV((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: createSkillId(), name: '' }],
    }));
  }, [setCV]);

  const handleUpdateSkill = useCallback((id: string, name: string) => {
    setCV((prev) => ({
      ...prev,
      skills: prev.skills.map((s: Skill) =>
        s.id === id ? { ...s, name } : s
      ),
    }));
  }, [setCV]);

  const handleDeleteSkill = useCallback((id: string) => {
    setCV((prev) => ({
      ...prev,
      skills: prev.skills.filter((s: Skill) => s.id !== id),
    }));
  }, [setCV]);

  const handleToggleEdit = useCallback(() => {
    if (isEditing) {
      const cleaned: CVData = {
        ...cv,
        skills: cv.skills.filter((s) => s.name.trim() !== ''),
      };
      save(cleaned);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [isEditing, cv, save]);

  const handleCancel = useCallback(() => {
    resetToSaved();
    setIsEditing(false);
  }, [resetToSaved]);

  return (
    <CVLayout
      headerActions={
        <EditToggle
          isEditing={isEditing}
          onToggle={handleToggleEdit}
          onCancel={isEditing ? handleCancel : undefined}
        />
      }
    >
      <div className="space-y-8">
        <ProfileSection
          data={cv}
          isEditing={isEditing}
          onChange={updateCV}
        />

        <EducationSection
          education={cv.education}
          isEditing={isEditing}
          onChange={(education) => updateCV({ education })}
        />

        <SkillsSection
          skills={cv.skills}
          isEditing={isEditing}
          onAdd={handleAddSkill}
          onUpdate={handleUpdateSkill}
          onDelete={handleDeleteSkill}
        />
      </div>
    </CVLayout>
  );
}
