import { useState } from "react";
import { UploadZone } from "../components/UploadZone";
import { stateNames } from "../lib/utils";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const USE_MOCK =
  !import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_URL.startsWith("http://localhost");

type Status = "idle" | "uploading" | "submitting" | "approved" | "rejected";

export function UploadPage() {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [plateText, setPlateText] = useState("");
  const [state, setState] = useState("MA");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Upload a clean photo of a physical vanity plate.");

  const isBusy = status === "uploading" || status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Step 1 — upload the image file (if one was selected)
    let imageUrl = "";
    if (file) {
      if (USE_MOCK) {
        // In mock mode we skip the real upload and use a placeholder
        imageUrl = URL.createObjectURL(file);
      } else {
        setStatus("uploading");
        setMessage("Uploading your photo…");
        try {
          const form = new FormData();
          form.append("file", file);
          const uploadRes = await fetch(`${API_URL}/api/upload`, {
            method: "POST",
            body: form,
          });
          if (!uploadRes.ok) {
            const err = await uploadRes.json().catch(() => ({}));
            throw new Error((err as { detail?: string }).detail ?? `Upload failed (${uploadRes.status})`);
          }
          const uploadData = await uploadRes.json() as { url: string };
          imageUrl = uploadData.url;
        } catch (err) {
          setStatus("rejected");
          setMessage(err instanceof Error ? err.message : "Photo upload failed. Please try again.");
          return;
        }
      }
    }

    // Step 2 — create the plate record
    setStatus("submitting");
    setMessage("Submitting your plate to the moderation queue…");

    try {
      if (USE_MOCK) {
        // Simulate network delay in mock mode
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const res = await fetch(`${API_URL}/api/plates`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state,
            plate_text: plateText,
            description,
            image_url: imageUrl,
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { detail?: string }).detail ?? `Submission failed (${res.status})`);
        }
      }

      setStatus("approved");
      setMessage("Your plate is in the moderation queue and will be live shortly.");
      // Reset form
      setFile(undefined);
      setPreviewUrl(undefined);
      setPlateText("");
      setDescription("");
    } catch (err) {
      setStatus("rejected");
      setMessage(err instanceof Error ? err.message : "We could not submit that plate just now. Please try again.");
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

          <button
            className="button button--amber"
            type="submit"
            disabled={isBusy || (!file && !plateText)}
          >
            {status === "uploading"
              ? "Uploading photo…"
              : status === "submitting"
              ? "Submitting…"
              : "Submit for moderation"}
          </button>
        </form>

        <aside className="upload-preview">
          <div className={`status-card status-card--${status === "uploading" || status === "submitting" ? "pending" : status}`}>
            <strong>
              {status === "idle" ? "Ready to submit"
                : status === "uploading" ? "Uploading photo"
                : status === "submitting" ? "Pending review"
                : status === "approved" ? "Approved"
                : "Rejected"}
            </strong>
            <span>{message}</span>
          </div>
        </aside>
      </section>
    </div>
  );
}
