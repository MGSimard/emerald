import { db } from "@/localserver/db";

export async function updateSearchedAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { searchedAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Failed updating last search date.");
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}

export async function updateSeenAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { seenAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Failed updating last seen date.");
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}

export async function updateCapturedAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { capturedAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Failed updating captured date.");
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}
