import { Router } from "express";
import { leaderboardQuerySchema } from "@plategallery/shared";
import { listLeaderboard } from "../services/plates-service";

export const leaderboardRouter = Router();

leaderboardRouter.get("/", async (req, res, next) => {
  try {
    const query = leaderboardQuerySchema.parse(req.query);
    const data = await listLeaderboard(query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

