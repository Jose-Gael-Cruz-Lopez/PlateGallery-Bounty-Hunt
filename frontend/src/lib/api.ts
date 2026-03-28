import { getMockResponse } from "./mockData";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

/**
 * When VITE_API_URL is not set (or points to localhost), the app uses
 * the mock data in mockData.ts instead of hitting the network.
 * Set VITE_API_URL to a real backend URL in .env to switch to live data.
 */
const USE_MOCK =
  !import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_URL.startsWith("http://localhost");

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  if (USE_MOCK) {
    return getMockResponse<T>(path);
  }

  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Failed request: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export type PlateSort = "newest" | "top" | "trending";

export type PlatePage<T> = {
  items: T[];
  nextCursor?: string | null;
};

export async function fetchPlatePage(path: string) {
  const response = await fetchJson<unknown>(path);

  if (Array.isArray(response)) {
    return {
      items: response,
      nextCursor: null
    };
  }

  return response as PlatePage<unknown>;
}
