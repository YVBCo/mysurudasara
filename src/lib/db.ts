import { createClient } from "@libsql/client";

// In production, this would be a remote URL (e.g. Turso)
// For local, we use a local file database
export const db = createClient({
  url: "file:local.db",
});
