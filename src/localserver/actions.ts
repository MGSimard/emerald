import { db } from "@/localserver/db";

export async function updateSearchedAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { searchedAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Failed updating last search date.");
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "UNKNOWN ERROR.");
  }
}
