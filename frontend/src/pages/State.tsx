import { Link, useParams } from "react-router-dom";
import { PlateCard } from "../components/PlateCard";
import { Leaderboard } from "../components/Leaderboard";
import { useLeaderboard, usePlates } from "../hooks/usePlates";
import { formatStateLabel } from "../lib/utils";

export function StatePage() {
  const { abbr = "MA" } = useParams();
  const feedQuery = usePlates({ state: abbr, sort: "newest" });
  const leaderboardQuery = useLeaderboard(abbr);
  const plates = feedQuery.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="page-stack">
      <Link className="breadcrumb" to="/map">Back to Map</Link>
      <section className="state-header">
        <div>
          <p className="eyebrow">State gallery</p>
          <h1>{formatStateLabel(abbr)} <span>{abbr}</span></h1>
        </div>
      </section>

      <section className="state-layout">
        <div>
          <div className="tab-row">
            <span className="tab-row__item is-active">New</span>
            <span className="tab-row__item">Top</span>
            <span className="tab-row__item">Trending</span>
          </div>
          {plates.length ? (
            <div className="masonry-grid">
              {plates.map((plate) => <PlateCard key={plate.id} plate={plate} />)}
            </div>
          ) : (
            <div className="empty-card">
              <strong>Be the first to submit a plate from {formatStateLabel(abbr)}.</strong>
              <Link to="/upload" className="button button--amber">Submit a Plate</Link>
            </div>
          )}
        </div>

        <aside className="sidebar-panel">
          <p className="eyebrow">Top 10</p>
          <h2>{abbr} leaderboard</h2>
          <Leaderboard plates={leaderboardQuery.data ?? []} />
        </aside>
      </section>
    </div>
  );
}

