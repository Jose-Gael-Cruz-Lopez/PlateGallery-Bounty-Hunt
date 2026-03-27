import { useState } from "react";
import { Leaderboard } from "../components/Leaderboard";
import { useLeaderboard } from "../hooks/usePlates";

const periods = ["all", "week", "month"] as const;

export function LeaderboardPage() {
  const [period, setPeriod] = useState<(typeof periods)[number]>("all");
  const query = useLeaderboard();

  return (
    <div className="page-stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Global leaderboard</p>
          <h1>Best plates on the board</h1>
        </div>
        <div className="tab-row">
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              className={`tab-row__item ${period === item ? "is-active" : ""}`}
              onClick={() => setPeriod(item)}
            >
              {item === "all" ? "All Time" : item === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>
      </section>

      <Leaderboard plates={query.data ?? []} />
    </div>
  );
}

