import { useCallback, useEffect, useState } from 'react';
import type { CVData } from '../types';
import { defaultCV } from '../data/defaultCV';

const STORAGE_KEY = 'cv-editor-data';

function loadFromStorage(): CVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultCV);
    const parsed = JSON.parse(raw) as CVData;
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !Array.isArray(parsed.skills)
    ) {
      return structuredClone(defaultCV);
    }
    return {
      photo: parsed.photo ?? defaultCV.photo,
      fullName: parsed.fullName ?? defaultCV.fullName,
      address: parsed.address ?? defaultCV.address,
      phone: parsed.phone ?? defaultCV.phone,
      education: parsed.education ?? defaultCV.education,
      skills: parsed.skills.map((s, i) => ({
        id: s.id || `skill-${i}-${Date.now()}`,
        name: s.name ?? '',
      })),
    };
  } catch {
    return structuredClone(defaultCV);
  }
}

export function useCVStorage() {
  const [cv, setCV] = useState<CVData>(loadFromStorage);
  const [savedSnapshot, setSavedSnapshot] = useState<CVData>(loadFromStorage);

  useEffect(() => {
    const loaded = loadFromStorage();
    setCV(loaded);
    setSavedSnapshot(structuredClone(loaded));
  }, []);

  const save = useCallback((data: CVData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedSnapshot(structuredClone(data));
      setCV(data);
    } catch (err) {
      console.error('Failed to save CV to localStorage', err);
      setCV(data);
    }
  }, []);

  const resetToSaved = useCallback(() => {
    setCV(structuredClone(savedSnapshot));
  }, [savedSnapshot]);

  const resetToDefault = useCallback(() => {
    const fresh = structuredClone(defaultCV);
    setCV(fresh);
    setSavedSnapshot(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    cv,
    setCV,
    save,
    resetToSaved,
    resetToDefault,
    savedSnapshot,
  };
}
