import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  buckets: {
    asset: { access: "public_read" },
  },
});
