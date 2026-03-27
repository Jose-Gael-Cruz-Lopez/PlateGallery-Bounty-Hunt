import { useQuery } from "@tanstack/react-query";
import type { Plate, StateStats } from "@plategallery/shared";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Failed request: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function usePlateFeed() {
  return useQuery({
    queryKey: ["plates"],
    queryFn: () => fetchJson<Plate[]>("/api/plates")
  });
}

export function useStateStats() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => fetchJson<StateStats[]>("/api/states")
  });
}

