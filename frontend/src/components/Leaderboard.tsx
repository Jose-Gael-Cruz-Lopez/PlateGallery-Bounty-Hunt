import { Link } from "react-router-dom";
import type { Plate } from "../lib/types";

type Props = {
  plates: Plate[];
  compact?: boolean;
};

export function Leaderboard({ plates, compact = false }: Props) {
  return (
    <div className={`leaderboard ${compact ? "leaderboard--compact" : ""}`}>
      {plates.map((plate, index) => (
        <Link key={plate.id} to={`/plate/${plate.id}`} className="leaderboard-row">
          <span className="leaderboard-row__rank">#{index + 1}</span>
          <img src={plate.thumbnailUrl ?? plate.imageUrl} alt={plate.plateText ?? "Plate"} />
          <div>
            <strong>{plate.plateText ?? "UNTITLED"}</strong>
            <span>{plate.state} · {plate.netScore} pts</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
