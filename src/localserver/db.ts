import Dexie, { type Transaction, type EntityTable } from "dexie";
import initialData from "@/localserver/initialData.json";

interface Target {
  id: number;
  name: string;
  level: number;
  zone: string;
  subzone: string;
  wiki: URL;
  seenAt: Date | null;
  capturedAt: Date | null;
  updatedAt: Date;
}
// Create DB instance
const db = new Dexie("BountyDatabase") as Dexie & {
  targets: EntityTable<
    Target,
    "id" // primary key "id" (for the typings only)
  >;
};

// Define schema (Declare indexes, not all columns)
db.version(1).stores({
  targets: "&id",
});

// Prepare data by adding missing columns
const preparedData = initialData.map((target) => ({
  ...target,
  seenAt: null,
  capturedAt: null,
  updatedAt: new Date().toISOString(),
}));

// Seed DB with initial data (Runs automatically on first DB interaction)
db.on("populate", async (tx: Transaction) => {
  await tx.table("targets").bulkAdd(preparedData);
});

export type { Target };
export { db };
