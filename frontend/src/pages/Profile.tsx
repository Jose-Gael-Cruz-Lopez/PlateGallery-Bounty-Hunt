import { useParams } from "react-router-dom";
import { PlateCard } from "../components/PlateCard";
import { usePlates } from "../hooks/usePlates";

export function ProfilePage() {
  const { username = "roadwatcher" } = useParams();
  const platesQuery = usePlates();
  const plates = platesQuery.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="page-stack">
      <section className="profile-header">
        <div className="profile-avatar">{username.slice(0, 2).toUpperCase()}</div>
        <div>
          <p className="eyebrow">Contributor profile</p>
          <h1>@{username}</h1>
          <p className="meta-faint">12 plates submitted · 3 states represented · joined March 2026</p>
        </div>
      </section>

      <div className="tab-row">
        <span className="tab-row__item is-active">Submitted</span>
        <span className="tab-row__item">Voted On</span>
      </div>

      <section className="masonry-grid">
        {plates.map((plate) => <PlateCard key={plate.id} plate={plate} />)}
      </section>
    </div>
  );
}

