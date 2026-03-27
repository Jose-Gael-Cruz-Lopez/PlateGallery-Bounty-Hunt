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

export const stateStatsSchema = z.object({
  state: stateCodeSchema,
  plateCount: z.number().int().nonnegative(),
  contributorCount: z.number().int().nonnegative().default(0),
  latestUpload: z.string().datetime().optional()
});

export type Plate = z.infer<typeof plateSchema>;
export type StateStats = z.infer<typeof stateStatsSchema>;
