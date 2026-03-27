import "dotenv/config";
import { createApp } from "./server";

const port = Number(process.env.PORT ?? 4000);
const app = createApp();

app.listen(port, () => {
  console.log(`PlateGallery API listening on http://localhost:${port}`);
});

