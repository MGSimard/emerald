import { db } from "@/localserver/db";

// Update last search date
export async function updateSearchedAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { searchedAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Dernière recherche n'as pas pu être mise à jour.");

    return { success: true, message: "Dernière recherche mise à jour." };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : "ERREUR INCONNUE." };
  }
}

// Update last seen date (to mark actual mob death time)
export async function updateSeenAt(targetId: number) {
  try {
    const success = await db.targets.update(targetId, { seenAt: new Date() });
    if (!success) throw new Error("DATABASE ERROR: Dernière observation n'as pas pu être mise à jour.");

    return { success: true, message: "Dernière observation mise à jour." };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : "ERREUR INCONNUE." };
  }
}

// Update captured date, if already exists set to null (to cancel)
export async function updateCapturedAt(targetId: number) {
  try {
    await db.transaction("rw", db.targets, async () => {
      const target = await db.targets.get(targetId);
      if (!target) throw new Error(`DATABASE ERROR: Recherché n'as pas pu être trouvé. (#${targetId})`);

      if (target.capturedAt) {
        const success = await db.targets.update(targetId, { capturedAt: null });
        if (!success) throw new Error("DATABASE ERROR: Statut de capture n'as pas pu être mis à jour.");
      } else {
        const success = await db.targets.update(targetId, { capturedAt: new Date() });
        if (!success) throw new Error("DATABASE ERROR: Statut de capture n'as pas pu être mis à jour.");
      }
    });

    return { success: true, message: "Statut de capture mis à jour." };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : "ERREUR INCONNUE." };
  }
}

// Reset database to initial data
export async function resetDatabase() {
  try {
    await db.delete();
    await db.open();

    return { success: true, message: "Base de données réinitialisée." };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : "ERREUR INCONNUE." };
  }
}
