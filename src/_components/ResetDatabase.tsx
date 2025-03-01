import { resetDatabase } from "@/localserver/actions";
import { IconRefresh } from "@/_components/Icons";
import { toast } from "sonner";

export function ResetDatabase() {
  const handleResetDatabase = async () => {
    const confirmed = confirm(
      "Êtes vous sûr de vouloir réinitialiser la base de données ? Cette action est irréversible."
    );
    if (!confirmed) return;

    const { success, message } = await resetDatabase();
    if (success) toast.success(message);
    else toast.error(message);
  };

  return (
    <button
      className="btn"
      type="button"
      onClick={handleResetDatabase}
      aria-label="Réinitialiser"
      title="Réinitialiser">
      <span>Réinitialiser</span>
      <IconRefresh />
    </button>
  );
}
