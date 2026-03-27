import { z } from "zod";

export const stateAbbreviations = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "DC"
] as const;

export const stateCodeSchema = z.enum(stateAbbreviations);

export const plateStatusSchema = z.enum(["pending", "approved", "rejected"]);

export const sortSchema = z.enum(["newest", "top", "trending"]);

export const plateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  imageUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  plateText: z.string().max(12).optional(),
  state: stateCodeSchema,
  description: z.string().max(280).optional(),
  status: plateStatusSchema,
  rejectionReason: z.string().optional(),
  upvoteCount: z.number().int().nonnegative(),
  downvoteCount: z.number().int().nonnegative(),
  netScore: z.number().int(),
  wilsonScore: z.number(),
  hotScore: z.number(),
  createdAt: z.string().datetime()
});

export const plateUploadSchema = z.object({
  state: stateCodeSchema,
  plateText: z.string().trim().min(1).max(12).optional(),
  description: z.string().trim().max(280).optional()
});

export const plateQuerySchema = z.object({
  cursor: z.string().optional(),
  state: stateCodeSchema.optional(),
  sort: sortSchema.default("newest"),
  limit: z.coerce.number().int().min(1).max(50).default(20)
});

export const voteSchema = z.object({
  value: z.union([z.literal(1), z.literal(-1)])
});

export const moderationRequestSchema = z.object({
  plateId: z.string().uuid(),
  imageUrl: z.string().url(),
  state: stateCodeSchema
});

export const moderationResponseSchema = z.object({
  approved: z.boolean(),
  reason: z.string(),
  confidence: z.number().min(0).max(1),
  phash: z.string().optional()
});

export const leaderboardQuerySchema = z.object({
  state: stateCodeSchema.optional(),
  period: z.enum(["day", "week", "month", "all"]).default("all")
});

export const stateStatsSchema = z.object({
  state: stateCodeSchema,
  plateCount: z.number().int().nonnegative(),
  contributorCount: z.number().int().nonnegative().default(0),
  latestUpload: z.string().datetime().optional()
});

export type Plate = z.infer<typeof plateSchema>;
export type PlateUploadInput = z.infer<typeof plateUploadSchema>;
export type PlateQuery = z.infer<typeof plateQuerySchema>;
export type VoteInput = z.infer<typeof voteSchema>;
export type ModerationRequest = z.infer<typeof moderationRequestSchema>;
export type ModerationResponse = z.infer<typeof moderationResponseSchema>;
export type LeaderboardQuery = z.infer<typeof leaderboardQuerySchema>;
export type StateStats = z.infer<typeof stateStatsSchema>;

