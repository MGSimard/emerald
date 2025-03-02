import { resetDatabase } from "@/localserver/actions";
import { IconTrash } from "@/_components/Icons";
import { toast } from "sonner";
import { useLang } from "@/_components/LangContext";

export function ResetDatabase() {
  const { lang } = useLang();

  const handleResetDatabase = async () => {
    const confirmed = confirm(
      lang === "fr"
        ? "Êtes vous certain de vouloir réinitialiser votre progression?\n\nCette action est irréversible.\n\n(HARD RESET)"
        : "Are you sure you want to reset your progress?\n\nThis action is irreversible.\n\n(HARD RESET)"
    );
    if (!confirmed) return;

    const { success, message } = await resetDatabase();
    if (success) toast.success(message);
    else toast.error(message);
  };

  return (
    <button
      className="btn square"
      type="button"
      onClick={handleResetDatabase}
      aria-label={lang === "fr" ? "Réinitialisation totale" : "HARD RESET"}
      title={lang === "fr" ? "Réinitialisation totale" : "HARD RESET"}>
      <IconTrash />
    </button>
  );
}
