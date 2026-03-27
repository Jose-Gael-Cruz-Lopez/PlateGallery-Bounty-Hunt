import type { Plate, StateStats } from "@plategallery/shared";

export const plateSeed: Plate[] = [
  {
    id: "6f89fbc2-9168-4344-8ea7-5e6f52ff5891",
    userId: "0f1606e4-39fd-4d74-a1a9-67b68f47fbf3",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
    plateText: "ILUV2SKI",
    state: "CO",
    description: "Spotted outside a ski rental shop in Boulder.",
    status: "approved",
    upvoteCount: 14,
    downvoteCount: 2,
    netScore: 12,
    wilsonScore: 0.79,
    hotScore: 3112.2,
    createdAt: "2026-03-21T15:30:00.000Z"
  },
  {
    id: "bc9a30f6-0562-4557-a9f0-cdd99ce7c8bb",
    userId: "2727d620-3dfb-44b3-8378-f21874d7c888",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80",
    plateText: "LOBSTRR",
    state: "ME",
    description: "A perfect coastal vanity plate.",
    status: "approved",
    upvoteCount: 22,
    downvoteCount: 1,
    netScore: 21,
    wilsonScore: 0.92,
    hotScore: 4120.8,
    createdAt: "2026-03-22T17:10:00.000Z"
  },
  {
    id: "4319a29c-f4b3-4d36-af98-fdd4fc23dd39",
    userId: "07ef9a7d-2d27-40da-a356-b4a76f01d1da",
    imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80",
    plateText: "BEANZ",
    state: "MA",
    description: "Boston energy in one word.",
    status: "pending",
    rejectionReason: "",
    upvoteCount: 4,
    downvoteCount: 0,
    netScore: 4,
    wilsonScore: 0.51,
    hotScore: 1999.1,
    createdAt: "2026-03-26T10:40:00.000Z"
  }
];

export const stateSeed: StateStats[] = [
  { state: "CO", plateCount: 12, contributorCount: 5, latestUpload: "2026-03-25T10:00:00.000Z" },
  { state: "MA", plateCount: 9, contributorCount: 4, latestUpload: "2026-03-26T10:40:00.000Z" },
  { state: "ME", plateCount: 7, contributorCount: 3, latestUpload: "2026-03-22T17:10:00.000Z" },
  { state: "NY", plateCount: 18, contributorCount: 8, latestUpload: "2026-03-26T22:15:00.000Z" },
  { state: "TX", plateCount: 6, contributorCount: 3, latestUpload: "2026-03-24T08:05:00.000Z" }
];

