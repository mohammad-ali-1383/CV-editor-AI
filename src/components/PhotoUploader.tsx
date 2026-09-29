import { useRef, useState } from 'react';

interface PhotoUploaderProps {
  currentPhoto: string | null;
  onPhotoChange: (dataUrl: string | null) => void;
  isEditing: boolean;
}

/** Resize image to max dimension while preserving aspect ratio, return JPEG data URL. */
function resizeImage(file: File, maxSize = 400, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function PhotoUploader({
  currentPhoto,
  onPhotoChange,
  isEditing,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Image is too large (max ~8 MB).');
      return;
    }

    setError(null);
    setIsProcessing(true);
    try {
      const dataUrl = await resizeImage(file);
      onPhotoChange(dataUrl);
    } catch {
      setError('Could not process the image. Try another file.');
    } finally {
      setIsProcessing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-2">
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md ring-1 ring-slate-200">
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-500">
            No photo
          </div>
        )}
        {isEditing && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isProcessing}
            className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-medium text-white opacity-0 transition hover:opacity-100 focus:opacity-100 disabled:cursor-wait"
            title="Change photo"
          >
            {isProcessing ? 'Processing…' : 'Change'}
          </button>
        )}
      </div>

      {isEditing && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isProcessing}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
            >
              {isProcessing ? 'Processing…' : 'Upload photo'}
            </button>
            {currentPhoto && (
              <button
                type="button"
                onClick={() => onPhotoChange(null)}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-red-600 shadow-sm hover:bg-red-50"
              >
                Remove
              </button>
            )}
          </div>
          {error && (
            <p className="text-center text-xs text-red-600">{error}</p>
          )}
        </>
      )}
    </div>
  );
}
