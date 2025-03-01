import Dexie, { type Transaction, type EntityTable } from "dexie";
import initialData from "@/localserver/initialData.json";

interface Target {
  id: number;
  name: string;
  level: number;
  zone: string;
  subzone: string;
  image: string;
  wiki: URL;
  searchedAt: Date | null;
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
  targets: "++id",
});

// Prepare data by adding missing columns
const preparedData = initialData.map((target) => ({
  ...target,
  searchedAt: null,
  seenAt: null,
  capturedAt: null,
  updatedAt: new Date(),
}));

// Seed DB with initial data (Runs automatically on first DB interaction)
db.on("populate", async (tx: Transaction) => {
  await tx.table("targets").bulkAdd(preparedData);
});

// Add new targets by ID if those IDs don't already exist in DB
// Update existing targets' static data (name, level, zone, subzone, wiki) if initialData has updated values
// (Like correcting name typos, patches changing levels, zones etc)
// But RETAIN user's dynamic data, like seenAt, capturedAt, updatedAt and anchor data like ID.

export type { Target };
export { db };
