import type { StateStats } from "@plategallery/shared";

type Props = {
  states: StateStats[];
  isLoading: boolean;
};

export function MapPreview({ states, isLoading }: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Interactive Map</p>
          <h2>State heat overview</h2>
        </div>
      </div>

      {isLoading ? (
        <p className="muted">Loading state coverage...</p>
      ) : (
        <div className="state-list">
          {states.map((state) => (
            <article key={state.state} className="state-pill">
              <strong>{state.state}</strong>
              <span>{state.plateCount} plates</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

