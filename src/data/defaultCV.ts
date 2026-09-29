import type { CVData } from '../types';

/** Simple neutral avatar as a data URL (SVG) so the app works offline with no external assets. */
const PLACEHOLDER_PHOTO =
  'data:image/svg+xml,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" fill="#e2e8f0"/>
  <circle cx="100" cy="80" r="40" fill="#94a3b8"/>
  <ellipse cx="100" cy="170" rx="60" ry="50" fill="#94a3b8"/>
</svg>
`.trim());

export const defaultCV: CVData = {
  photo: PLACEHOLDER_PHOTO,
  fullName: 'Alex Rivera',
  address: '42 Maple Street, Apt 3B\nSan Francisco, CA 94102',
  phone: '+1 (415) 555-0198',
  education:
    'M.S. Computer Science — Stanford University (2019–2021)\nB.S. Software Engineering — UC Berkeley (2015–2019)',
  skills: [
    { id: 'skill-1', name: 'React' },
    { id: 'skill-2', name: 'TypeScript' },
    { id: 'skill-3', name: 'Tailwind CSS' },
    { id: 'skill-4', name: 'Node.js' },
    { id: 'skill-5', name: 'System Design' },
  ],
};
