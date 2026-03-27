import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/api";
import type { StateStats } from "../lib/types";
import { getHeatColor, unlockedStates } from "../lib/utils";

export function useMapData() {
  const query = useQuery({
    queryKey: ["states"],
    queryFn: () => fetchJson<StateStats[]>("/api/states")
  });

  const states = query.data ?? [];
  const maxCount = Math.max(...states.map((item) => item.plateCount), 0);
  const derived = {
    unlocked: unlockedStates(states),
    total: 51,
    maxCount,
    stateSettings: Object.fromEntries(
      states.map((state) => [
        state.state,
        {
          fill: getHeatColor(state.plateCount, maxCount)
        }
      ])
    )
  };

  return { ...query, ...derived };
}
