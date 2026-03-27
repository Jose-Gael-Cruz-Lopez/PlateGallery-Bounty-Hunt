import { useState } from "react";
import { Link } from "react-router-dom";
import { PlateCard } from "../components/PlateCard";
import { PlateFrame } from "../components/PlateFrame";
import { usePlates, useLeaderboard } from "../hooks/usePlates";
import type { PlateSort } from "../lib/api";

export function Home() {
  const [sort, setSort] = useState<PlateSort>("newest");
  const feedQuery = usePlates({ sort });
  const trendingQuery = useLeaderboard();
  const plates = feedQuery.data?.pages.flatMap((page) => page.items) ?? [];
  const featured = trendingQuery.data?.[0] ?? plates[0];

  return (
    <div className="page-stack">
      <section className="hero-banner">
        <div className="hero-banner__copy">
          <p className="eyebrow">Retro-Americana editorial feed</p>
          <h1>The Internet&apos;s Vanity Plate Hall of Fame.</h1>
          <p>
            A living scrapbook of roadside wit, regional pride, and weird little moments caught at stoplights.
          </p>
          <div className="hero-banner__actions">
            <Link to="/upload" className="button button--amber">Submit a Plate</Link>
            <Link to="/map" className="button button--ghost">Explore the Map</Link>
          </div>
        </div>

        <div className="hero-banner__feature">
          <p className="eyebrow">Plate of the Day</p>
          {featured ? (
            <>
              <img src={featured.imageUrl} alt={featured.plateText ?? "Featured plate"} />
              <PlateFrame plateText={featured.plateText ?? "FEATURED"} state={featured.state} accent="teal" />
            </>
          ) : (
            <div className="empty-card">Hot-score favorite will appear here.</div>
          )}
        </div>
      </section>

      <section className="section-head">
        <div>
          <p className="eyebrow">Feed</p>
          <h2>Fresh plates from the national gallery</h2>
        </div>
        <div className="tab-row">
          <button type="button" className={`tab-row__item ${sort === "newest" ? "is-active" : ""}`} onClick={() => setSort("newest")}>New</button>
          <button type="button" className={`tab-row__item ${sort === "top" ? "is-active" : ""}`} onClick={() => setSort("top")}>Top</button>
          <button type="button" className={`tab-row__item ${sort === "trending" ? "is-active" : ""}`} onClick={() => setSort("trending")}>Trending</button>
        </div>
      </section>

      <section className="masonry-grid">
        {plates.map((plate) => (
          <PlateCard key={plate.id} plate={plate} />
        ))}
      </section>

      <div className="load-row">
        <button
          className="button button--ghost"
          type="button"
          onClick={() => feedQuery.fetchNextPage()}
          disabled={!feedQuery.hasNextPage || feedQuery.isFetchingNextPage}
        >
          {feedQuery.isFetchingNextPage ? "Loading more..." : "Load more plates"}
        </button>
      </div>
    </div>
  );
}
