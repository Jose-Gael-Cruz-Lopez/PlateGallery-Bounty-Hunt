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
        <div>
          <strong>Drop a plate photo here</strong>
          <span>or click to choose a file from your camera roll</span>
        </div>
      )}
    </label>
  );
}

