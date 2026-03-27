import { Leaderboard } from "../components/Leaderboard";
import { USAMapPanel } from "../components/USAMap";
import { useMapData } from "../hooks/useMap";
import { useLeaderboard } from "../hooks/usePlates";

export function MapPage() {
  const mapQuery = useMapData();
  const leaderboardQuery = useLeaderboard();

  const progress = `${(mapQuery.unlocked / mapQuery.total) * 100}%`;

  return (
    <div className="map-page">
      <section className="section-head">
        <div>
          <p className="eyebrow">Nationwide progress</p>
          <h1>{mapQuery.unlocked} states unlocked out of 51</h1>
        </div>
        <div className="progress-meter">
          <div style={{ width: progress }} />
        </div>
      </section>

      <section className="map-layout">
        <div className="map-stage">
          <USAMapPanel states={mapQuery.data ?? []} />
        </div>
        <aside className="sidebar-panel">
          <p className="eyebrow">National top 5</p>
          <h2>Leaderboard rail</h2>
          <Leaderboard plates={(leaderboardQuery.data ?? []).slice(0, 5)} compact />
        </aside>
      </section>
    </div>
  );
}

