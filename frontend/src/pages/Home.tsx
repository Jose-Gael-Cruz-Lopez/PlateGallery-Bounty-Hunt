import { useState } from "react";
import { Link } from "react-router-dom";
import { PlateCard } from "../components/PlateCard";
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
      {/* ── Hero ── */}
      <section className="hero-banner">
        <div className="hero-banner__copy">
          <p className="eyebrow">The internet&apos;s favorite road obsession</p>
          <h1>Vanity Plate<br />Hall of Fame.</h1>
          <p>
            A living gallery of roadside wit, regional pride, and weird little moments caught at stoplights across America.
          </p>
          <div className="hero-banner__actions">
            <Link to="/upload" className="button button--amber">
              + Submit a Plate
            </Link>
            <Link to="/map" className="button button--ghost">
              Explore the Map
            </Link>
          </div>
        </div>

        <div className="hero-banner__feature">
          <p className="eyebrow">Plate of the Day</p>
          {featured ? (
            <img
              src={featured.imageUrl}
              alt={featured.plateText ?? "Featured plate"}
            />
          ) : (
            <div className="empty-card">
              Today&apos;s top-voted plate will appear here.
            </div>
          )}
        </div>
      </section>

      {/* ── Feed header ── */}
      <section className="section-head">
        <div>
          <p className="eyebrow">Community Feed</p>
          <h2>Fresh plates from across the country</h2>
        </div>
        <div className="tab-row">
          {(["newest", "top", "trending"] as PlateSort[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`tab-row__item ${sort === s ? "is-active" : ""}`}
              onClick={() => setSort(s)}
            >
              {s === "newest" ? "New" : s === "top" ? "Top Rated" : "Trending"}
            </button>
          ))}
        </div>
      </section>

      {/* ── Masonry feed ── */}
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
          {feedQuery.isFetchingNextPage ? "Loading…" : "Load more plates"}
        </button>
      </div>
    </div>
  );
}
