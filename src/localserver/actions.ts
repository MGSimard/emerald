import { db } from "@/localserver/db";

// Update last search date
export async function updateSearchedAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { searchedAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Failed updating last search date.");
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}

// Update last seen date (to mark actual mob death time)
export async function updateSeenAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { seenAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Failed updating last seen date.");
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}

// Update captured date, if already exists set to null (to cancel)
export async function updateCapturedAt(targetId: number) {
  try {
    await db.transaction("rw", db.targets, async () => {
      const target = await db.targets.get(targetId);
      if (!target) throw new Error("DATABASE ERROR: Target ID not found.");

      if (target.capturedAt) {
        const success = await db.targets.update(targetId, { capturedAt: null });
        if (!success) throw new Error("DATABASE ERROR: Failed updating captured date.");
      } else {
        const success = await db.targets.update(targetId, { capturedAt: new Date() });
        if (!success) throw new Error("DATABASE ERROR: Failed updating captured date.");
      }
    });
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}

// Reset database to initial data
export async function resetDatabase() {
  try {
    await db.delete();
    await db.open();
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}
