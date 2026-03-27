import { Router } from "express";
import { listStateStats } from "../services/plates-service";

export const statesRouter = Router();

statesRouter.get("/", async (_req, res, next) => {
  try {
    const data = await listStateStats();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

