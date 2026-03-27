export function UploadPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Upload Pipeline</p>
          <h2>Async moderation by design</h2>
        </div>
      </div>

      <ol className="pipeline-list">
        <li>Client compresses image and posts metadata to the Express API.</li>
        <li>API validates file rules, stores a pending record, and uploads to Cloudinary quarantine.</li>
        <li>BullMQ dispatches the moderation job to FastAPI using a compact JSON contract.</li>
        <li>Frontend polls status until the plate flips to approved or rejected.</li>
      </ol>
    </section>
  );
}

