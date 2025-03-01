import Dexie, { type Transaction, type EntityTable } from "dexie";
import initialData from "@/localserver/initialData.json";
import { toast } from "sonner";

interface Target {
  id: number;
  name: string;
  level: number;
  zone: string;
  subzone: string;
  image: string;
  wiki: string;
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
  targets: "&id",
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

// Synchronize DB with initialData.json when it changes (but retain user's dynamic data)
db.open()
  .then(async () => {
    try {
      const dbTargets = await db.targets.toArray();
      const dbTargetsMap = new Map(dbTargets.map((target) => [target.id, target]));
      const initialDataMap = new Map(initialData.map((target) => [target.id, target]));

      await db.transaction("rw", db.targets, async () => {
        for (const [id, initialTarget] of initialDataMap.entries()) {
          const existingTarget = dbTargetsMap.get(id);

          if (existingTarget) {
            const needsUpdate =
              existingTarget.name !== initialTarget.name ||
              existingTarget.level !== initialTarget.level ||
              existingTarget.zone !== initialTarget.zone ||
              existingTarget.subzone !== initialTarget.subzone ||
              existingTarget.image !== initialTarget.image ||
              existingTarget.wiki !== initialTarget.wiki;

            if (needsUpdate) {
              await db.targets.update(id, {
                name: initialTarget.name,
                level: initialTarget.level,
                zone: initialTarget.zone,
                subzone: initialTarget.subzone,
                image: initialTarget.image,
                wiki: initialTarget.wiki,
                updatedAt: new Date(),
              });
              toast.success("Base de données synchronisée.");
            }
          } else {
            await db.targets.add({
              ...initialTarget,
              searchedAt: null,
              seenAt: null,
              capturedAt: null,
              updatedAt: new Date(),
            });
            toast.success("Base de données synchronisée.");
          }
        }

        for (const [id] of dbTargetsMap.entries()) {
          if (!initialDataMap.has(id)) {
            await db.targets.delete(id);
            toast.success("Base de données synchronisée.");
          }
        }
      });
    } catch (_) {
      throw new Error("ERROR: La base de données n'a pas pu être synchronisée.");
    }
  })
  .catch((_) => {
    toast.error("ERROR: La base de données n'a pas pu être synchronisée.");
  });

export type { Target };
export { db };
