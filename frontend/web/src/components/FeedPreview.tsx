import type { Plate } from "@plategallery/shared";

type Props = {
  plates: Plate[];
  isLoading: boolean;
};

export function FeedPreview({ plates, isLoading }: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Gallery Feed</p>
          <h2>Seed data hooked to shared types</h2>
        </div>
      </div>

      {isLoading ? (
        <p className="muted">Loading feed...</p>
      ) : (
        <div className="feed-grid">
          {plates.map((plate) => (
            <article key={plate.id} className="plate-card">
              <div className="plate-card__image">
                <img src={plate.imageUrl} alt={plate.plateText ?? "Vanity license plate"} />
              </div>
              <div className="plate-card__body">
                <div className="plate-card__meta">
                  <strong>{plate.plateText ?? "Mystery plate"}</strong>
                  <span>{plate.state}</span>
                </div>
                <p>{plate.description ?? "Waiting for a description."}</p>
                <small>{plate.netScore} score</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

