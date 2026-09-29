import type { CVData } from '../types';
import { PhotoUploader } from './PhotoUploader';

interface ProfileSectionProps {
  data: CVData;
  isEditing: boolean;
  onChange: (patch: Partial<CVData>) => void;
}

export function ProfileSection({ data, isEditing, onChange }: ProfileSectionProps) {
  return (
    <section className="flex flex-col items-center gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:gap-8">
      <PhotoUploader
        currentPhoto={data.photo}
        isEditing={isEditing}
        onPhotoChange={(photo) => onChange({ photo })}
      />

      <div className="w-full flex-1 space-y-3 text-center sm:text-left">
        {isEditing ? (
          <>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Full name
              </label>
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xl font-bold text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Address
              </label>
              <textarea
                value={data.address}
                onChange={(e) => onChange({ address: e.target.value })}
                rows={2}
                className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Street, city, postal code"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Phone
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {data.fullName || 'Your Name'}
            </h1>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {data.address || 'Address not set'}
            </p>
            <p className="text-sm font-medium text-slate-700">
              {data.phone || 'Phone not set'}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
