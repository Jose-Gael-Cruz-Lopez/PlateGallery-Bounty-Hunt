type Props = {
  previewUrl?: string;
  onFileChange: (file?: File) => void;
};

export function UploadZone({ previewUrl, onFileChange }: Props) {
  return (
    <label className="upload-zone">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(event) => onFileChange(event.target.files?.[0])}
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Plate preview" className="upload-zone__preview" />
      ) : (
        <div className="upload-zone__hint">
          <svg className="upload-zone__icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="10" width="36" height="28" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="22" cy="24" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M14 10L16.5 5H27.5L30 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="34" cy="17" r="1.5" fill="currentColor" />
          </svg>
          <strong>Tap to photograph a plate</strong>
          <span>or drag and drop an image here</span>
        </div>
      )}
    </label>
  );
}
