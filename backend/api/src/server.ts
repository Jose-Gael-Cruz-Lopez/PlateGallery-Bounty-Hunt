import cors from "cors";
import express from "express";
import { platesRouter } from "./routes/plates";
import { leaderboardRouter } from "./routes/leaderboard";
import { statesRouter } from "./routes/states";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "api" });
  });

  app.use("/api/plates", platesRouter);
  app.use("/api/leaderboard", leaderboardRouter);
  app.use("/api/states", statesRouter);

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}

