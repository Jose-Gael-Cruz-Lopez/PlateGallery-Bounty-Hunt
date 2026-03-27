import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchJson, fetchPlatePage, type PlateSort } from "../lib/api";
import type { Plate } from "../lib/types";

type Options = {
  state?: string;
  sort?: PlateSort;
};

export function usePlates(options: Options = {}) {
  const state = options.state ? `&state=${options.state}` : "";
  const sort = options.sort ?? "newest";

  return useInfiniteQuery({
    queryKey: ["plates", options.state, sort],
    initialPageParam: null as string | null,
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam ? `&cursor=${pageParam}` : "";
      return fetchPlatePage(`/api/plates?limit=20&sort=${sort}${state}${cursor}`) as Promise<{ items: Plate[]; nextCursor?: string | null }>;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
  });
}

export function usePlate(id?: string) {
  return useQuery({
    queryKey: ["plate", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const plates = await fetchJson<Plate[]>("/api/plates");
      return plates.find((plate) => plate.id === id) ?? plates[0];
    }
  });
}

export function useLeaderboard(state?: string) {
  const query = state ? `?state=${state}` : "";

  return useQuery({
    queryKey: ["leaderboard", state],
    queryFn: () => fetchJson<Plate[]>(`/api/leaderboard${query}`)
  });
}
