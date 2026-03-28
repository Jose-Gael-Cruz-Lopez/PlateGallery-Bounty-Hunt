import { useState } from "react";
import { UploadZone } from "../components/UploadZone";
import { fetchJson } from "../lib/api";
import { stateNames } from "../lib/utils";

type Status = "idle" | "pending" | "approved" | "rejected";

export function UploadPage() {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [plateText, setPlateText] = useState("");
  const [state, setState] = useState("MA");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Upload a clean photo of a physical vanity plate.");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");
    setMessage("Submitting your plate to the moderation queue...");

    try {
      await fetchJson("/api/plates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state,
          plateText,
          description
        })
      });

      window.setTimeout(() => {
        setStatus("approved");
        setMessage("Your plate is live and ready for the gallery.");
      }, 1200);
    } catch {
      setStatus("rejected");
      setMessage("We could not submit that plate just now. Please try again.");
    }
  }

  function handleFileChange(nextFile?: File) {
    setFile(nextFile);

    if (!nextFile) {
      setPreviewUrl(undefined);
      return;
    }

    setPreviewUrl(URL.createObjectURL(nextFile));
  }

  return (
    <div className="upload-page">
      <section className="upload-layout">
        <form className="upload-form" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Submit a plate</p>
            <h1>Give the gallery a new roadside legend.</h1>
          </div>

          <UploadZone previewUrl={previewUrl} onFileChange={handleFileChange} />

          <label className="field">
            <span>State</span>
            <select value={state} onChange={(event) => setState(event.target.value)}>
              {Object.entries(stateNames).map(([abbr, name]) => (
                <option key={abbr} value={abbr}>{name}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Plate text</span>
            <input
              value={plateText}
              onChange={(event) => setPlateText(event.target.value.toUpperCase().slice(0, 8))}
              placeholder="ILUV2SKI"
            />
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value.slice(0, 280))}
              placeholder="Where did you spot it?"
              rows={4}
            />
          </label>

          <button className="button button--amber" type="submit" disabled={!file && !plateText}>
            Submit for moderation
          </button>
        </form>

        <aside className="upload-preview">
          <div className={`status-card status-card--${status}`}>
            <strong>{status === "idle" ? "Ready to submit" : status === "pending" ? "Pending review" : status === "approved" ? "Approved" : "Rejected"}</strong>
            <span>{message}</span>
          </div>
        </aside>
      </section>
    </div>
  );
}

