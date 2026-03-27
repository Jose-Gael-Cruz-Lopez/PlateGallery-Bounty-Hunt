const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
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
