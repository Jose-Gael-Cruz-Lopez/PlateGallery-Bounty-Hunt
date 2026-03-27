import type { ModerationRequest } from "@plategallery/shared";

export async function enqueueModerationJob(payload: ModerationRequest) {
  return {
    queued: true,
    queue: "moderation",
    payload
  };
}

