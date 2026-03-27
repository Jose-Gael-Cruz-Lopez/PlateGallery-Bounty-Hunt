import { Link } from "react-router-dom";
import { PlateFrame } from "./PlateFrame";
import { VoteButton } from "./VoteButton";
import { timeAgo } from "../lib/utils";
import type { Plate } from "../lib/types";

type Props = {
  plate: Plate;
};

export function PlateCard({ plate }: Props) {
  return (
    <article className="plate-card">
      <Link to={`/plate/${plate.id}`} className="plate-card__image">
        <img src={plate.thumbnailUrl ?? plate.imageUrl} alt={plate.plateText ?? "Vanity license plate"} loading="lazy" />
      </Link>
      <div className="plate-card__content">
        <div className="plate-card__header">
          <span className="state-badge">{plate.state}</span>
          <span className="meta-faint">@roadwatcher</span>
        </div>
        <PlateFrame plateText={plate.plateText ?? "UNTITLED"} state={plate.state} />
        <p className="plate-card__caption">{plate.description ?? "Classic roadside energy, freshly added to the gallery."}</p>
        <div className="plate-card__footer">
          <small>{timeAgo(plate.createdAt)}</small>
          <VoteButton initialScore={plate.netScore} />
        </div>
      </div>
    </article>
  );
}
