import { Router } from "express";
import { plateQuerySchema, plateUploadSchema, voteSchema } from "@plategallery/shared";
import { createPlate, listPlates, submitVote } from "../services/plates-service";
import { enqueueModerationJob } from "../services/moderation-service";

export const platesRouter = Router();

platesRouter.get("/", async (req, res, next) => {
  try {
    const query = plateQuerySchema.parse(req.query);
    const data = await listPlates(query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

platesRouter.post("/", async (req, res, next) => {
  try {
    const input = plateUploadSchema.parse(req.body);
    const result = await createPlate(input);
    await enqueueModerationJob(result.moderationJob);

    res.status(202).json({
      plateId: result.plate.id,
      status: result.plate.status,
      moderationJob: result.moderationJob
    });
  } catch (error) {
    next(error);
  }
});

platesRouter.get("/:id/status", async (req, res) => {
  res.json({
    plateId: req.params.id,
    status: "pending"
  });
});

platesRouter.post("/:id/vote", async (req, res, next) => {
  try {
    const input = voteSchema.parse(req.body);
    const result = await submitVote(req.params.id, input);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

