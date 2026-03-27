import { randomUUID } from "node:crypto";
import {
  leaderboardQuerySchema,
  type LeaderboardQuery,
  type ModerationRequest,
  type Plate,
  type PlateQuery,
  type PlateUploadInput,
  type StateStats,
  type VoteInput
} from "@plategallery/shared";
import { plateSeed, stateSeed } from "../lib/seed-data";

export async function listPlates(query: PlateQuery): Promise<Plate[]> {
  return plateSeed
    .filter((plate) => !query.state || plate.state === query.state)
    .sort((a, b) => {
      if (query.sort === "top") {
        return b.wilsonScore - a.wilsonScore;
      }

      if (query.sort === "trending") {
        return b.hotScore - a.hotScore;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, query.limit);
}

export async function createPlate(input: PlateUploadInput): Promise<{
  plate: Plate;
  moderationJob: ModerationRequest;
}> {
  const plate: Plate = {
    id: randomUUID(),
    userId: "00000000-0000-0000-0000-000000000001",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/plategallery/quarantine/sample.jpg",
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_400/v1/plategallery/quarantine/sample.jpg",
    plateText: input.plateText,
    state: input.state,
    description: input.description,
    status: "pending",
    rejectionReason: undefined,
    upvoteCount: 0,
    downvoteCount: 0,
    netScore: 0,
    wilsonScore: 0,
    hotScore: 0,
    createdAt: new Date().toISOString()
  };

  const moderationJob: ModerationRequest = {
    plateId: plate.id,
    imageUrl: plate.imageUrl,
    state: plate.state
  };

  return { plate, moderationJob };
}

export async function submitVote(id: string, input: VoteInput) {
  return {
    plateId: id,
    value: input.value,
    updatedScore: input.value
  };
}

export async function listLeaderboard(query: LeaderboardQuery): Promise<Plate[]> {
  const parsed = leaderboardQuerySchema.parse(query);
  return listPlates({ state: parsed.state, sort: "top", limit: 10 });
}

export async function listStateStats(): Promise<StateStats[]> {
  return stateSeed;
}
