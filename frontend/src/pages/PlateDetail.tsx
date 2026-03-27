import { useParams } from "react-router-dom";
import { PlateFrame } from "../components/PlateFrame";
import { VoteButton } from "../components/VoteButton";
import { usePlate } from "../hooks/usePlates";
import { formatStateLabel, timeAgo } from "../lib/utils";

export function PlateDetailPage() {
  const { id } = useParams();
  const query = usePlate(id);
  const plate = query.data;

  if (!plate) {
    return <div className="empty-card">Plate not found.</div>;
  }

  return (
    <div className="detail-layout">
      <section className="detail-media">
        <img src={plate.imageUrl} alt={plate.plateText ?? "Plate detail"} />
      </section>
      <section className="detail-copy">
        <p className="eyebrow">{formatStateLabel(plate.state)}</p>
        <h1>{plate.plateText}</h1>
        <PlateFrame plateText={plate.plateText ?? "UNTITLED"} state={plate.state} accent="teal" />
        <p>{plate.description}</p>
        <div className="detail-meta">
          <span>Submitted by @roadwatcher</span>
          <span>{timeAgo(plate.createdAt)}</span>
        </div>
        <VoteButton initialScore={plate.netScore} />
      </section>
    </div>
  );
}

