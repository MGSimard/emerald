import { resetDatabase } from "@/localserver/actions";
import { IconRefresh } from "@/_components/Icons";
import { toast } from "sonner";
import { useLang } from "@/_components/LangContext";

export function ResetDatabase() {
  const { lang } = useLang();

  const handleResetDatabase = async () => {
    const confirmed = confirm(
      lang === "fr"
        ? "Êtes vous sûr de vouloir réinitialiser la base de données ? Cette action est irréversible."
        : "Are you sure you want to reset the database? This action is irreversible."
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
      aria-label={lang === "fr" ? "Réinitialiser" : "Reset"}
      title={lang === "fr" ? "Réinitialiser" : "Reset"}>
      <span>{lang === "fr" ? "Réinitialiser" : "Reset"}</span>
      <IconRefresh />
    </button>
  );
}
