import { MapPreview } from "./components/MapPreview";
import { UploadPanel } from "./components/UploadPanel";
import { FeedPreview } from "./components/FeedPreview";
import { usePlateFeed, useStateStats } from "./lib/api";

export function App() {
  const platesQuery = usePlateFeed();
  const statesQuery = useStateStats();
  const approved = platesQuery.data?.filter((plate) => plate.status === "approved").length ?? 0;
  const totalStates = statesQuery.data?.filter((item) => item.plateCount > 0).length ?? 0;

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">PlateGallery Architecture Starter</p>
          <h1>React, Express, FastAPI, and shared contracts are wired together.</h1>
          <p className="lede">
            This starter gives you the upload flow, API seams, moderation contract, and state-driven UI shell
            so the team can split work without stepping on each other.
          </p>
        </div>

        <div className="hero-stats">
          <article>
            <strong>{approved}</strong>
            <span>seed plates</span>
          </article>
          <article>
            <strong>{totalStates}</strong>
            <span>unlocked states</span>
          </article>
        </div>
      </section>

      <section className="dashboard-grid">
        <UploadPanel />
        <MapPreview states={statesQuery.data ?? []} isLoading={statesQuery.isLoading} />
      </section>

      <FeedPreview plates={platesQuery.data ?? []} isLoading={platesQuery.isLoading} />
    </main>
  );
}
