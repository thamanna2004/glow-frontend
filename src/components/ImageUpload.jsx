import { useEffect, useRef, useState } from "react";

export default function ImageUpload({
  label = "Product Image",
  value,
  existingUrl,
  onChange,
  onClear,
  required = false,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(existingUrl || "");

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreview(existingUrl || "");
    return undefined;
  }, [value, existingUrl]);

  const clearImage = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setPreview("");
    onClear?.();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-navy-900">{label}</label>

      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-ice-200 bg-[#f8f6f2]">
          <img
            src={preview}
            alt="Product preview"
            className="aspect-square w-full object-cover"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy-900 shadow-sm transition hover:bg-white"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-ice-300 bg-ice-50/50 px-4 py-10 text-center transition hover:border-ice-400 hover:bg-ice-50"
        >
          <svg
            viewBox="0 0 24 24"
            className="mb-3 h-8 w-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10.5" r="1.5" />
            <path d="m21 16-5.5-5.5a2 2 0 0 0-3 0L7 16" />
          </svg>
          <span className="text-sm font-medium text-navy-900">Upload product image</span>
          <span className="mt-1 text-xs text-slate-500">JPG, PNG or WEBP up to 5MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0] || null;
          onChange(file);
        }}
        className="hidden"
        required={required && !preview}
      />

      {!preview && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs font-medium uppercase tracking-[0.12em] text-navy-900 underline"
        >
          Choose file
        </button>
      )}
    </div>
  );
}
