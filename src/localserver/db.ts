import Dexie, { type EntityTable } from "dexie";

interface Target {
  id: number;
  name: string;
  level: number;
  zone: string;
  subzone: string;
  seenAt: Date | null;
  capturedAt: Date | null;
  updatedAt: Date;
}

const db = new Dexie("BountyDatabase") as Dexie & {
  targets: EntityTable<
    Target,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  targets: "++id, name, level, zone, subzone, seenAt, capturedAt, updatedAt", // primary key "id" (for the runtime!)
});

export type { Target };
export { db };
